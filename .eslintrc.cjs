module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    /*
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    'vue/no-multiple-template-root': 'off', // 关闭多根节点的校验
    'vue/multi-word-component-names': 'off', // 关闭组件命名规则
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // off=0|warn=1|error=2,'kebab-case'|'PascalCase'
    'vue/no-v-html': 'off',
    'vue/v-on-event-hyphenation': 'off',

    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',

    'accessor-pairs': 2, // 定义对象的set存取器属性时，强制定义get
    'arrow-spacing': [2, { before: true, after: true }], // =>的前/后括号
    'block-spacing': [2, 'always'], // 块是否需要空格
    'brace-style': [2, '1tbs', { allowSingleLine: true }], // if while function 后面的{必须与if在同一行，java风格
    camelcase: [0, { properties: 'always' }], // 强制驼峰法命名
    'comma-dangle': [2, 'never'], // 数组和对象键值对最后一个逗号，never：不能带末尾的逗号, always：必须带末尾的逗号，always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-spacing': [2, { before: false, after: true }], // 控制逗号前后的空格
    'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现
    'constructor-super': 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScript的编译器也会提示
    curly: [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'default-case': 0, // 在switch语句中需要默认情况
    'dot-location': [2, 'property'], // 强制object.key中.的位置，参数:property:'.'号应与属性在同一行, object:'.'号应与对象名在同一行
    'dot-notation': 0, // 尽可能强制使用点表示法
    'eol-last': 2, // 文件末尾强制换行
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 使用 === 替代 ==
    'func-names': [0, 'as-needed'],
    'generator-star-spacing': [2, { before: true, after: true }], // 生成器函数*的前后空格
    'handle-callback-err': [2, '^(err|error)$'], // nodejs 处理错误
    indent: [2, 2, { SwitchCase: 1 }], // 缩进风格
    'jsx-quotes': [2, 'prefer-single'], // JSX 属性中一致使用双引号或单引号
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'keyword-spacing': [2, { before: true, after: true }], // 对象字面量中冒号的前后空格
    'new-cap': [2, { newIsCap: true, capIsNew: false }], // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 2, // new时必须加小括号
    'no-array-constructor': 2, // 禁止使用数组构造器
    'no-await-in-loop': 0, // 不允许在循环内等待
    'no-caller': 2, // 禁止使用arguments.caller或arguments.callee
    'no-console': 'off', // 禁用 console
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-dupe-args': 2, // 函数参数不能重复
    'no-dupe-class-members': 2, // 不允许类中出现重复的声明
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁止使用eval
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, // 禁止扩展native对象
    'no-extra-bind': 2, // 禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, // 禁止不必要的bool转换
    'no-extra-parens': [2, 'functions'], // 禁止非必要的括号
    'no-fallthrough': 2, // 禁止switch穿透
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implied-eval': 2, // 禁止使用隐式eval
    'no-inner-declarations': [2, 'functions'], // 禁止在块语句中使用声明（变量或函数）
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-iterator': 2, // 禁止使用__iterator__ 属性
    'no-label-var': 2, // label名不能与var声明的变量名相同
    'no-labels': [2, { allowLoop: false, allowSwitch: false }], // 禁止标签声明
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-lonely-if': 'off', // 禁止-if-语句作为唯一语句出现在-else-语句块中
    'no-mixed-spaces-and-tabs': 2, // 禁止混用tab和空格
    'no-multi-spaces': 2, // 不能用多余的空格
    'no-multi-str': 2, // 字符串不能用\换行
    'no-multiple-empty-lines': [2, { max: 1 }], // 空行最多不能超过1行
    'no-native-reassign': 2, // 不能重写native对象
    'no-negated-in-lhs': 2, // in 操作符的左边不能有!
    'no-new-object': 2, // 禁止使用new Object()
    'no-new-require': 2, // 禁止使用new require
    'no-new-symbol': 2, // 禁止使用new symbol
    'no-new-wrappers': 2, // 禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 2, // 不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 2, // 禁止使用八进制数字
    'no-octal-escape': 2, // 禁止使用八进制转义序列
    'no-param-reassign': 0, // 禁用参数重写
    'no-path-concat': 2, // node中不能使用__dirname或__filename做路径拼接
    'no-plusplus': 0, // 不允许使用一元运算符++和--
    'no-proto': 2, // 禁止使用__proto__属性
    'no-prototype-builtins': 0, // 不允许直接对对象调用某些Object.prototype方法
    'no-redeclare': 2, // 禁止重复声明变量
    'no-regex-spaces': 2, // 禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-restricted-globals': 0, // 不允许指定的全局变量
    'no-return-assign': [2, 'except-parens'], // return 语句中不能有赋值表达式
    'no-self-assign': 2, // 自我分配
    'no-self-compare': 2, // 不能比较自身
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-shadow': 0, // 不允许变量声明遮蔽在外部作用域中声明的变量
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
    'no-this-before-super': 2, // 在调用super()之前不能使用this或super
    'no-throw-literal': 2, // 禁止抛出字面量错误 throw "error"
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-undef': 2, // 不能有未定义的变量
    'no-undef-init': 2, // 变量初始化时不能直接给它赋值为undefined
    'no-unexpected-multiline': 2, // 避免多行表达式
    'no-unmodified-loop-condition': 2, // 检查引用是否在循环中被修改
    'no-unneeded-ternary': [2, { defaultAssignment: false }], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unsafe-finally': 2, // 禁止对关系运算符的左操作数使用否定操作符
    'no-unused-vars': [2, { vars: 'all', args: 'none' }], // 不能有声明后未被使用的变量或参数
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-useless-computed-key': 2, // 没有必要使用带文字的计算属性
    'no-useless-constructor': 2, // 可以在不改变类的工作方式的情况下安全地移除的类构造函数
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2, // 禁用with
    'one-var': [2, { initialized: 'never' }], // 连续声明
    'operator-linebreak': [0, 'after', { overrides: { '?': 'before', ':': 'before' } }], // 换行时运算符在行尾还是行首
    'padded-blocks': [2, 'never'], // 块语句内行首行尾是否要空行
    'space-before-blocks': [2, 'always'], // 不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [
      2,
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ], // 函数定义时括号前面要不要有空格
    'space-in-parens': [2, 'never'], // 小括号里面要不要有空格
    'space-infix-ops': 2, // 中缀操作符周围要不要有空格
    'space-unary-ops': [2, { words: true, nonwords: false }], // 一元运算符的前/后要不要加空格
    // 注释风格不要有空格什么的
    'spaced-comment': [
      2,
      'always',
      { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }
    ],
    'template-curly-spacing': [2, 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'wrap-iife': [2, 'any'], // 立即执行函数表达式的小括号风格
    'yield-star-spacing': [2, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    yoda: [2, 'never'], // 禁止尤达条件

    'prefer-const': 2, // 首选const
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 debugger
    'object-curly-spacing': [0, 'always', { objectsInObjects: false }], // 大括号内是否允许不必要的空格
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格

    'no-restricted-syntax': 0, // 禁止使用特定的语法
    'no-loop-func': 0, // 禁止循环中存在函数
    'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    'import/prefer-default-export': 0, // 希望导出default，即export default xxx

    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }], // 引号类型 `` "" ''
    semi: [2, 'never'], // 语句强制分号结尾
    'semi-spacing': [2, { before: false, after: true }] // 分号前后空格
  }
}
