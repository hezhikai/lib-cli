module.exports = {
  proseWrap: 'never', //preserve 按照文件原样折行，always 当超出print width（上面有这个参数）时就折行，never 不折行
  tabWidth: 2, //每个 tab 的空格数
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
  semi: true, //行尾是否使用分号，默认为true
  quoteProps: 'as-needed', //仅在需要时在对象属性周围添加引号
  jsxSingleQuote: true, // 在JSX中使用单引号而不是双引号。
  trailingComma: 'none', //是否使用尾逗号，在es5中有效的尾随逗号（对象、数组等）
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  jsxBracketSameLine: true, //将多行JSX元素的>放在最后一行的末尾，而不是单独放在下一行
  arrowParens: 'always', //在唯一箭头函数参数周围包含括号
  htmlWhitespaceSensitivity: 'css', //指定HTML文件的全局空白敏感度，尊重css display属性的默认值
  vueIndentScriptAndStyle: true, //是否缩进Vue文件中<script>和<style>标记中的代码
  endOfLine: 'auto' //文本文件的行尾形式
  // parser: "vue" //代码的解析引擎，默认为babylon，与babel相同。
};
