//htmlHint校检
const path = require('path');
const fs = require('fs');
const HTMLHint = require('htmlhint').HTMLHint;
const getVueFilesUrl = (basePath) => {
  let filesUrl = fs
    .readdirSync(path.resolve(basePath), 'utf-8')
    .map((fileName) => basePath + '/' + fileName);
  let vueFilesUrl = [];
  filesUrl.forEach((url) => {
    if (fs.lstatSync(url).isDirectory()) {
      vueFilesUrl = vueFilesUrl.concat(getVueFilesUrl(url));
    } else if (url.indexOf('.vue') + 4 === url.length) {
      vueFilesUrl.push(url);
    }
  });
  return vueFilesUrl;
};
const getMessagesHtml = (basePath) => {
  const config = require('../../.htmlhintrc');
  let messagesHTML = [];
  for (let item of getVueFilesUrl(basePath)) {
    let html = fs.readFileSync(path.resolve(item), 'utf-8');
    messagesHTML.push(HTMLHint.verify(html, config));
  }
  return messagesHTML.filter((item) => item.length > 0);
};

module.exports = () => {
  let resultsHTML = getMessagesHtml('src');
  let errorNumber = [].concat(...resultsHTML).length;
  console.log('html: error:', errorNumber);
  return errorNumber;
};
