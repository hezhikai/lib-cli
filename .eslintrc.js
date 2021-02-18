const prettierrc = require('./.prettierrc.js');

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    amd: true,
    jest: true // 支持 jest 语法
  },
  globals: {},
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['json', 'node', 'promise', 'prettier'],
  rules: {
    'prettier/prettier': ['error', prettierrc], // 不符合 prettier 规则的代码，要进行错误提示（红线）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
