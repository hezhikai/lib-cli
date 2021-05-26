//stylelint校检
const path = require('path');
const stylelint = require('stylelint');

module.exports = () => {
  return stylelint
    .lint({
      configBasedir: path.join(__dirname),
      config: require('../../.stylelintrc'),
      files: path.resolve('src/**/*.{vue,css,scss,less}')
    })
    .then((data) => {
      let results = data.results.map((item) => item.warnings);
      let errorNumber = [].concat(...results).length;
      console.log('css: error:', errorNumber);
      return errorNumber;
    });
};
