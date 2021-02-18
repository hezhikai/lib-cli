#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const { login } = require('./network');
const baseConfig = require('./network/config');
const { pipeAsyncFunctions, paramCase } = require('./utils');

program.usage('[project-name]');

program.on('--help', () => {
  console.log('  Examples:');
  console.log();
  console.log(chalk.gray('    # create a new project with an official template'));
  console.log('    $ hf init my-project');
});

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

function downloadAndGenerate() {
  let templates = [];
  return pipeAsyncFunctions(
    () => {
      if (fs.existsSync(program.args[0])) {
        return inquirer.prompt([
          {
            name: 'cover',
            type: 'input',
            message: '组件路径已存在，是否覆盖？',
            default: 'n'
          },
        ]).then(res => {
          if (res.cover === 'y') {
            return Promise.resolve();
          } else {
            return Promise.reject('请重新输入组件路径');
          }
        })
      }
    },
    () => login(baseConfig.serviceIp),
    loginToken => axios({
      method: 'post',
      baseURL: baseConfig.serviceIp,
      url: '/nodeService/projectManage/projectTemplate/get',
      headers: {
        loginToken
      }
    }),
    res => {
      if (res.data.success) {
        templates = res.data.data;
        return inquirer.prompt([
          {
            name: 'templateName',
            type: 'list',
            message: '选择项目模板',
            choices: templates.map(item => item.templateName)
          },
          {
            name: 'clientId',
            type: 'input',
            message: '请输入项目ID',
          },
          {
            name: 'appName',
            type: 'input',
            message: '请输入应用名',
          },
          {
            name: 'proxyPort',
            type: 'input',
            message: '请输入前端node代理端口号',
          },
        ])
      } else {
        return Promise.reject(res.data.msg);
      }
    },
    res => {
      let local_url = program.args[0];
      let projectName = paramCase(local_url);
      let web_url = templates.find(temp => temp.templateName === res.templateName).templateUrl;
      const spinner = ora('downloading template');
      spinner.start();
      download(web_url, local_url, err => {
        if (!err) {
          console.info(chalk.blueBright('\n下载成功'));
          
          let packageJson = fs.readFileSync(local_url + '/package.json', 'utf-8');
          packageJson = JSON.parse(packageJson);
          packageJson.name = projectName;
          fs.writeFileSync(local_url + '/package.json', JSON.stringify(packageJson, null, '\t'), 'utf-8');
  
          let envFile = fs.readFileSync(local_url + '/.env', 'utf-8');
          envFile = envFile.split('\n').map(k => {
            if (k.includes('clientId')) k = k.replace(/(?<=(clientId *= *))\S+/, res.clientId);
            if (k.includes('appName')) k = k.replace(/(?<=(appName *= *))\S+/, res.appName);
            return k;
          }).join('\n');
          fs.writeFileSync(local_url + '/.env', envFile, 'utf-8');
  
          let vueConfig = fs.readFileSync(local_url + '/vue.config.js', 'utf-8');
          fs.writeFileSync(local_url + '/vue.config.js', vueConfig.replace(/(?<=service_ip: 'http:\/\/10.1.6.154:)\d+/, res.proxyPort), 'utf-8')
        } else {
          console.info(chalk.red('\n下载失败'));
        }
        spinner.stop();
      });
    }
  )().catch(err => {
    console.info(chalk.red('\n' + err));
  })
}

downloadAndGenerate();
