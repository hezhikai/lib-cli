#!/usr/bin/env node
const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .alias('i')
  .command('rollupBuild', 'build module')
  .alias('b')
  .command('uploadModule', 'upload module file')
  .alias('u')
  .command('release', 'release commonModule')
  .alias('r')
  .command('rollbackVersion', 'rollback version')
  .alias('rv')
  .parse(process.argv);
