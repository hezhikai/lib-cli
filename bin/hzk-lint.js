const eslint = require('./lint/eslint.js');
const stylelint = require('./lint/stylelint.js');
const htmlhint = require('./lint/htmlhint.js');

async function lint() {
  let jsErrorNumber = eslint();
  let cssErrorNumber = await stylelint();
  let htmlErrorNumber = htmlhint();
  if (htmlErrorNumber + jsErrorNumber + cssErrorNumber > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
lint();
