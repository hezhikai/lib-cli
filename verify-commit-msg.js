const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
// eslint-disable-next-line prettier/prettier
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();
// 日志格式：[revert: | 仅回退代码的场景] 提交类型[(影响范围)]: 改动内容
/* 提交类型分为： feat 新功能；fix 修复bug；docs 书写文档；style 修改样式；refactor 重构；
                              perf 性能优化；test 测试代码；workflow 工作流；ci 脚本；chore 其他杂事 */
const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `无效的提交消息格式。`
    )}\n\n` +
      chalk.red(`  自动生成更改日志需要正确的提交消息格式。比如：\n\n`) +
      `    ${chalk.green(`feat(路由): 新增路由权限`)}\n` +
      `    ${chalk.green(`fix(xx页面): 修复xx问题`)}`
  );
  process.exit(1);
}
