#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const { pipeAsyncFunctions, paramCase } = require('./utils');

program.usage('[project-name]');

program.on('--help', () => {
  console.log('  Examples:');
  console.log(
    chalk.gray('    # create a new project with an official template')
  );
  console.log('    $ hzk init my-project');
});

program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
let local_url = program.args[0];
let web_url = 'github:hezhikai/template-vue';
downloadAndGenerate();

function downloadAndGenerate() {
  return pipeAsyncFunctions(
    () => {
      if (fs.existsSync(program.args[0])) {
        return inquirer
          .prompt([
            {
              name: 'cover',
              type: 'input',
              message: '文件路径已存在，是否覆盖？',
              default: 'n'
            }
          ])
          .then((res) => {
            if (res.cover === 'y') {
              return Promise.resolve();
            } else {
              return Promise.reject('请重新输入文件路径');
            }
          });
      }
    },
    () => {
      let projectName = paramCase(local_url);
      const spinner = ora('downloading template');
      spinner.start();
      download(web_url, local_url, (err) => {
        if (!err) {
          console.info(chalk.blueBright('\n下载成功'));

          let packageJson = fs.readFileSync(
            local_url + '/package.json',
            'utf-8'
          );
          packageJson = JSON.parse(packageJson);
          packageJson.name = projectName;
          fs.writeFileSync(
            local_url + '/package.json',
            JSON.stringify(packageJson, null, '\t'),
            'utf-8'
          );
        } else {
          console.info(chalk.red('\n下载失败'));
        }
        spinner.stop();
      });
    }
  )().catch((err) => {
    console.info(chalk.red('\n' + err));
  });
}
