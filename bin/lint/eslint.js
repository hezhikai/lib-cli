//eslint校检
const path = require('path');
const eslint = require('eslint');
const CLIEngine = eslint.CLIEngine;
const cli = new CLIEngine({
  baseConfig: require('../../.eslintrc')
});

module.exports = () => {
  let messagesJs = cli.executeOnFiles([path.resolve('src/**/*.{vue,js}')]);
  console.log(
    'js: error:',
    messagesJs.errorCount,
    'warn:',
    messagesJs.warningCount
  );
  return messagesJs.errorCount;
};
