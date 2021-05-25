const child_process = require('child_process');
const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs');
const changeCase = require('change-case');

const pipeAsyncFunctions = (...fns) => (arg) =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

exports.pipeAsyncFunctions = pipeAsyncFunctions;

exports.shellExec = (str) => {
  const exec = child_process.exec;
  return new Promise((resolve, reject) => {
    console.log(chalk.cyan(`exec: ${str}`));
    let data = '';
    let shell = exec(str, (error) => {
      if (error) reject();
    });
    shell.stdout.on('data', output);
    shell.stderr.on('data', output);
    function output(d) {
      data += d;
      console.log(d);
    }
    shell.on('close', () => {
      resolve(data);
    });
  });
};

exports.checkCommit = () => {
  return exports.shellExec('git status').then((data) => {
    return !data.includes('modified:');
  });
};

//删除文件夹
exports.rmDir = (path) => {
  if (!fs.existsSync(path)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

//新建
exports.mkdir = (path) => {
  if (fs.existsSync(path)) return Promise.resolve();
  let pathArray = path.split(/\/|\\/g);
  return pipeAsyncFunctions(
    ...pathArray.map((item, index, arr) => () => {
      let tempPath = arr.slice(0, index + 1).join('/');
      fs.existsSync(tempPath) || fs.mkdirSync(tempPath);
    })
  )();
};

exports.paramCase = (str) => {
  return changeCase.paramCase(str, {
    stripRegexp: /[^A-Za-z0-9_]/g
  });
};

exports.camelCase = (str) => {
  return changeCase.camelCase(str, {
    stripRegexp: /[^A-Za-z0-9_]/g
  });
};
