#!/usr/bin/env node
const program = require('commander');

program
  // .arguments('<username> [password]')
  // .description('test command', {
  //   username: 'user to login',
  //   password: 'password for user, if required'
  // })
  // .action((username, password) => {
  //   console.log('username:', username);
  //   console.log('environment:', password || 'no password given');
  // })
  .version(require('../package').version, '-v, --version') // 使用 -v --version 查看版本而不是 -V
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .alias('i')
  .command('lint', 'lint js/html/css')
  .alias('l')

  // .command('release', 'release commonModule')
  // .alias('r')
  .parse(process.argv);
