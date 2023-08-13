一、项目信息
    1.项目名称：KBNET.EAP表示KBNET开发平台下的EAP项目，EAP即英文Enterprise Application Platform。
    2.项目说明：本项目只是一个简单的开发框架，目的是为了将基于Vue3的开发技术集成到一起，然后相互搭配和调度，为实际业务功能开发打下坚实的基础。
    3.更多信息：本项目以PC机上的浏览器为基准设计开发，倘若使用智能设备（如手机等）访问系统，体验感可能会降低，甚至于某些功能无法使用。

二、开发环境
    1.本项目是在VSCode工具下设计编程，是以Vue3+Vite2为基础，因此，在编译运行项目时，确保安装相应的编程工具。
    2.如果您想阅读项目源码，或者基于此项目模型开发新项目，请首先确认对Vue技术栈的掌握能力，以及谨慎阅读并审核过项目源码，确保项目源码的安全性等事项。
    3.由于Vue的开发依赖Nodejs工具，所以您还需要在您的计算机上下载并安装Nodejs。
    4.下载本项目源码，且安装了开发环境相应的工具，就可以安装依赖的软件包
        npm install 
    5.运行模式，通过运行npm run命令，系统提示Vite提供了三种命令：dev命令用于开发调试，build用于正式发布，preview用于打包预览（看一下实际效果）。
        npm run dev
        npm run build
        npm run preview 
    6.安装VSCode工具Vue开发相关插件，这些插件有利于快速编码、以及代码检验。
        ESLint
        Prettier - Code formatter
        Html CSS Support
        JavaScript(ES6)code snippets
        Live Server
        Vue3 Snippets
        Vue Language Features
        Vue VSCode Snippets
        ...
        一般情况，大家还会安装以下插件
        JQuery Code Snippets
        Bootstrap4,Font awesome4 Snippets
        Bootstrap5,Font awesome5 Snippets
        React/Redux/React-Native snippets
        Go
        C#
        ... 
    7.代码格式化，没患强迫症的码农不算合格的程序员，多一个空格或空行都会感觉难受，为了统一代码格式，需要使用ESLint+Prettier进行约束和格式化
        npx prettier --write . #.表示所有文件
    8.浏览器支持度，具体支持那种类型或哪个版本的浏览器，是由Vue框架决定，Vue3已不再支持IE浏览器，支持的主浏览器包含：
        Edge>=88 | Firefox>=78 | Chrome>=87 | Safari>=14

三、工具插件
    1.npm常用命令
        1.1.安装模块：npm install xxxx@version 或 npm install xxxx@lastest
        1.2.卸载模块：npm uninstall xxxx
        1.3.更新模块：npm update
        1.4.检查模块是否已经过时：npm outdated
        1.5.查看安装的模块：npm ls
        1.6.查看包的安装路径：npm root
        1.7.强制清理模块缓存：npm cache clean --force
        1.8.查看模块版本：npm version 
    2.初始化项目：npm init vite，然后按照提示输入正确的内容。
    3.vue-router
    3.1.安装指令：npm install vue-router@latest--save
    3.2.在src目录下创建router文件夹，在文件夹下创建index.js文件
    3.3.编写index.js内容
    3.4.修改main.js文件，引入vue-router
            import \* as Vue from 'vue'
            import App from './App.vue'
            import router from './router/index'

            const app=Vue.createApp(App)
            app.use(router)
            app.mount('#app')
    4.vuex
        4.1.安装指令：npm install vuex@latest --save
        4.2.在src下创建目录store文件夹，然后在其下创建index.js文件
        4.3.编写index.js内容
        4.4.修改main.js文件，引入vuex
            import * as Vue from 'vue'
            import App from './App.vue'
            import store from './store/index'

            const app=Vue.createApp(App)
            app.use(store)
            app.mount('#app')
    5.elementplus
        5.1.安装指令：npm install element-plus --save
        5.2.修改main.js文件，引入elementplus
            import * as Vue from 'vue'
            import App from './App.vue'
            import ElementPlus from 'element-plus'
            import 'element-plus/theme-chalk/index.css'
            import zhCn from 'element-plus/es/locale/lang/zh-cn'

            const app=Vue.createApp(App)
            app.use(ElementPlus,{locale:zhCn})
            app.mount('#app')
        5.3.Icon图标
            a.安装指令：npm install @element-plus/icons-vue
            b.注册图标，在main.js文件中
                import * as ElementPlusIconsVue from '@element-plus/icons-vue'
                const app = createApp(App)
                for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                    app.component(key, component)
                }
    6.axios
        6.1.安装指令：npm install axios
        6.2.配置跨域请求事项，修改vite.config.js文件
            import {defineConfig} from 'vite'
            import vue from '@vitejs/plugin-vue'
            import path from 'path'   // 需安装此模块
            import cfgSetting from './src/configs/settings'
            export default defineConfig({
                plugins: [
                    vue()
                ],
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'src')
                    }
                },
                server: {
                    host: cfgSetting.spaAddress,
                    port: cfgSetting.spaPort,
                    strictPort: false,              //设为true时端口被占用则直接退出，不会尝试下一个可用端口
                    cors: true,                     //为开发服务器配置CORS, 默认启用并允许任何源
                    open: true,                     //服务启动时自动在浏览器中打开应用
                    hmr: false,                     //禁用或配置 HMR 连接
                    //传递给 chockidar 的文件系统监视器选项
                    watch: {
                        ignored:["!**/node_modules/your-package-name/**"]
                    },
                    proxy: {
                        [cfgSetting.apiType]: {
                                target: cfgSetting.svcAddress,   //实际请求地址
                                changeOrigin: true,
                                ws: true,
                                rewrite: (path) => path.replace(cfgSetting.apiType, '')
                        }
                    },
                    https: cfgSetting.svcIsHttps
                }
            })
    7.i18n
        7.1.安装指令：npm install vue-i18n
        7.2.在src目录下创建locales目录，并添加index.js，zh_cn.js，en_us.js三个文件
        7.3.编辑index.js文件
                import { createI18n } from 'vue-i18n' //引入vue-i18n组件
                import zh_cn from './zh_cn'  //中文语言包
                import en_us from './en_us'  //英文语言包
                // 实例化I18n
                const i18n = createI18n({
                    legacy: false,
                    globalInjection: true,
                    locale: "zh_cn", // 初始化配置语言
                    messages: {
                        zh_cn,
                        en_us
                    }
                })
                export default i18n
        7.4.编辑zh_cn.js文件
                export default {
                    message: {
                        Home: '首页',
                        About: '关于'
                    }
                }
        7.5.编辑en_us.js文件
                export default {
                    message: {
                        Home: 'Home',
                        About: 'About'
                    }
                }
        7.6.修改main.js文件，引入vue-i18n
                import * as Vue from 'vue'
                import App from './App.vue'
                import i18n from './locales/index'

                const app=Vue.createApp(App)
                app.use(i18n)
                app.mount('#app')
        7.7.测试效果，修改App.vue文件
                <template>
                    <img alt="Vue logo" src="@/assets/logo.png" />
                    <a href="javascript:void(0)" @click="change('zh_cn')">中文</a> --
                    <a href="javascript:void(0)" @click="change('en_us')">English</a>
                    <div>{{$t("message.Home")}}---{{$t("message.About")}}</div>
                    <router-view />
                </template>
                <script>
                    import { useI18n } from 'vue-i18n'
                    export default ({
                        name: "App",
                        setup() {
                            const { locale } = useI18n()
                            function change(type) {
                                locale.value = type;
                            }
                            return {
                                change
                            }
                        }
                    })
                </script>
    8.mock
        8.1.安装指令
            a.安装mockjs：npm install mockjs --save-dev
            b.安装vite-plugin-mock：npm i vite-plugin-mock cross-env -D
        8.2.在 package.json 中设置环境变量
            将"dev": "vite"改为“"dev": "cross-env NODE_ENV=development vite"”
        8.3.在 vite.config.js 中添加 mockjs 插件
            import { defineConfig } from "vite"
            import vue from "@vitejs/plugin-vue"
            import { viteMockServe } from "vite-plugin-mock"

            export default defineConfig({
                plugins: [
                    vue(),
                    viteMockServe({
                        supportTs: false     //如果使用typescript开发，则需要配置supportTs为true
                    })
                ]
            })
        8.4.在根目录创建 mock 文件夹，建立getData.js在其中创建需要的数据接口
            export default [
                {
                    url: "/api/getUsers",
                    method: "get",
                    response: () => {
                        return {
                            code: 0,
                            message: "ok",
                            data: ["张三", "李四"],
                        }
                    }
                }
            ]
    9.sass
        9.1.安装指令：npm i sass -D
        9.2.使用sass，语法：<style lang="scss"></style>
    10.gzip
        10.1.安装指令：npm i vite-plugin-compression -D
        10.2.修改vite.config.js文件，引入插件
            import { defineConfig } from 'vite'
            import vue from '@vitejs/plugin-vue'
            import viteCompression from 'vite-plugin-compression'
            import path from 'path'
            export default defineConfig({
                plugins: [
                    vue(),
                    viteCompression({
                        threshold: 10240,      //体积大于10kb压缩
                        filter: /\.(js|mjs|json|css|html)$/i,
                        algorithm: 'gzip',          //压缩算法，gzip|brotliCompress|deflate|deflateRaw
                        disable: false,
                        deleteOriginFile: false   //是否删除源文件
                    })
                ],
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'src')
                    }
                }
            })
    11.copy
        11.1.安装指令：npm install rollup-plugin-copy -D
        11.2.修改vite.config.js文件，引入插件
            import { defineConfig } from 'vite'
            import vue from '@vitejs/plugin-vue'
            import copy from 'rollup-plugin-copy'
            import path from 'path'
            export default defineConfig({
                plugins: [
                    vue(),
                    copy({
                        targets: [
                            { src: 'src/static', dest: 'dist' }, //执行拷贝
                        ],
                        hook: 'writeBundle' // notice here
                    })
                ],
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'src')
                    }
                }
            })
    12.eslint+prettier
        12.1.eslint
            12.1.1.安装指令：npm i eslint -D
            12.1.2.配置eslint：执行npx eslint --init命令，然后按照提示完成一系列操作来创建配置文件
            12.1.3.修改.eslintrc.cjs文件，编写配置信息
            12.1.4.在VSCode使用ESlint，需要安装插件：ESLint
            12.1.5.使用eslint格式化代码
                    a.在package.json的scripts属性里配置 格式化 命令
                        "scripts": {
                            "lint": "eslint --fix --ext .js,.vue src"
                        }
                    b.终端执行命令
                        npm run lint
        12.2.prettier
            12.2.1.安装指令：npm i prettier -D
            12.2.2.配置prettier
                    {
                        "useTabs": false, //使用tab缩进，默认false
                        "tabWidth": 2, //tab缩进大小,默认为2空格数
                        "printWidth": 100, //换行长度，默认80
                        "singleQuote": true, //使用单引号代替双引号
                        "trailingComma": "none", //是否在多行逗号分隔语法中，在最后一个元素后面加逗号
                        "bracketSpacing": true, //在对象，数组括号与文字之间加空格 "{ foo: bar }"
                        "semi": false, //每行末尾自动添加分号
                        "endOfLine": "auto" //换行符类型
                    }
            12.2.3.VSCode编辑器，安装Prettier插件：Prettier - Code formatter
            12.2.4.使用其命令格式化代码文件
                    #格式化所有文件（. 表示所有文件）
                    npx prettier --write .
        12.3.兼容问题
            12.3.1.解决eslint和prettier冲突
                    a.安装插件：npm i eslint-plugin-prettier eslint-config-prettier -D
                    b.修改.eslintrc.js配置文件，添加prettier插件
                            module.exports = {
                                extends: [
                                    'plugin:vue/essential',
                                    'airbnb-base',
                                    'plugin:prettier/recommended' // 添加 prettier 插件
                                ],
                            }
    13.postcss
        13.1.安装指令：npm install postcss postcss-preset-env -D
        13.2.配置vite.config.js文件
                import { defineConfig } from 'vite'
                import vue from '@vitejs/plugin-vue'
                import postcssPresetEnv from 'postcss-preset-env'

                export default defineConfig({
                    base: './',
                    publicDir: 'public', // 静态资源服务的文件夹
                    logLevel: 'info', // 控制台输出的级别 info 、warn、error、silent
                    clearScreen: true, // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
                    css: {
                        postcss: {
                            plugins: [postcssPresetEnv]
                        }
                    }
                })
    14.svgIcon
        14.1.创建目录和文件结构
                目录：./src/styles
                目录：./src/styles/svg
                目录：./src/styles/svg/svgs
                文件：./src/styles/svg/index.vue
                文件：./src/styles/svg/svgBuilder.js
        14.2.安装svg插件
                指令：npm install svg-sprite-loader -D
        14.3.编写./src/styles/svg/index.vue文件
        14.4.编写./src/styles/svg/svgBuilder.js文件，需要安装fs模块：npm install fs
        14.5.编辑main.js文件，引入./src/styles/svg/index.vue文件
                import * as Vue from 'vue'
                import SvgIcon from './icons/index.vue'
                import App from './App.vue'

                const app = Vue.createApp(App)
                app.component('svg-icon', SvgIcon)
                app.mount('#app')
        14.6.配置vite.config.js文件，使svgBuilder.js文件功能启用
                import { defineConfig } from 'vite'
                import vue from '@vitejs/plugin-vue'
                import { svgBuilder } from './src/styles/svg/svgBuilder'

                export default defineConfig({
                    base: './',
                    plugins: [
                        vue(),
                        svgBuilder('./src/styles/svg/svgs/') // 这里已经将src/styles/svg/svgs/下的svg全部导入
                    ]
                })
        14.7.使用效果
                <svg-icon icon-class="login-user" />
                或
                <svg-icon :icon-class="passwordType === 'password' ? 'password-eye' : 'password-eye-open'" />
    15.nprogress
        15.1.安装指令：npm install nprogress -S
        15.2.在/src/utils文件夹下，创建nprogress.js文件，编写内容。
    16.js-cookie
        16.1.安装指令：npm install js-cookie
        16.2.使用方式：
            import Cookies from "js-cookie"
            // 写入cookie
            Cookies.set('name', 'value') // 创建简单的cookie
            Cookies.set('key', 'value', { expires: 10 }) // 通常会以当前时间+多少毫秒，如const newDate=new Date(new Date().getTime() + 20 * 60 * 1000)
            Cookies.set('key', 'value', { path: '', domain: '' }) //可以通过配置path等
            Cookies.set('key', 'value', { expires: 10, path: '', domain: '' })
            // 读取
            Cookies.get('name')
            // 删除某项cookie值
            Cookies.remove('name') // 删除普通的cookie
            Cookies.remove('name', { path: '' }) // 删除存了指定页面path的cookie

    17.echarts
        17.1.安装指令：npm install echarts vue-echarts
        17.2.使用方式：用 npm 与 Vue Loader 基于 ES Module 引入（按需引用）
            import ECharts from 'vue-echarts'
            //手动引入 ECharts 各模块来减小打包体积
            import 'echarts/lib/chart/bar'
            import 'echarts/lib/component/tooltip'
            // 注册组件后即可使用
            import Vue from 'vue'
            Vue.component('v-chart', ECharts)
            或
            export default {
                components: {
                    'v-chart': ECharts
                }
            }

四、配置规则
    1.部署配置
        1.1.IIS服务器
            a.在生产环境或开发测试环境，如若以IIS作为宿主程序，那么一定要在站点的根目录创建一个名称为web.config的配置文件，且内容为下述信息。
            b.因为此项目是单页面程序，如果在浏览器地址栏手动输入非首页地址（http://www.xxxx.com/xxxx/xxxxxx）或者刷新非首页地址页面请求会直接发往服务器，而服务器找不到目标文件会报404或500错误（特别是history路由模式下）。
            c.配置信息
                <?xml version="1.0" encoding="UTF-8"?>
                <configuration>
                    <system.webServer>
                        <rewrite>
                            <rules>
                                <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
                                    <match url="(.*)" />
                                    <conditions logicalGrouping="MatchAll">
                                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                                    </conditions>
                                    <action type="Rewrite" url="/" />
                                </rule>
                            </rules>
                        </rewrite>
                    </system.webServer>
                </configuration>
            d.安装UrlWrite模块，这一步是关键，否则上述配置无效。
        1.2.nginx服务器
            a.配置信息
                location / {
                    try_files $uri $uri/ /index.html;
                } 
    2.Http2Https
        2.1.IIS服务器：在http网站下的web.config下添加如下规则。
            <?xml version="1.0" encoding="UTF-8"?>
            <configuration>
            <system.webServer>
                <rewrite>
                <rules>
                    <rule name="HTTP2HTTPS" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" ignoreCase="true" />
                    </conditions>
                    <action type="Redirect" redirectType="Found" url="https://{HTTP_HOST}/{R:1}" />
                    </rule>
                </rules>
                </rewrite>
            </system.webServer>
            </configuration>
        2.2.nginx服务器：使用rewrite 将请求过来的 http URL直接重写成 https
            server {
                listen 80;
                #填写绑定证书的域名
                server_name www.xxx.com;
                #强制将http的URL重写成https
                rewrite ^(.*) https://$server_name$1 permanent; 
            }
    3.令牌验证码解释
        50000：不支持的授权方式
        50001：授权信息验证无效
        50002：没有权限请求目标资源
        50005：授权信息已失效
        50006：权限验证失败(即请求者没有权限)
        50010：授权信息已失效
        50011：请求来源与授权不符
        50012：令牌已失效
        50013：权限验证失败(即请求者没有权限)
        50020：错误的加密数据
        50021：无效的加密数据
        50023：数据解密异常
        50025：无法完成数据加密
        50026：无法获取密钥信息
        50027：数据加密异常
        50030：请求无效，未知的程序类型
    4.

五、疑难杂症
    1.无法安装软件包，总是失败的解决办法
        1.1.删除node_modules文件夹，重新安装
        1.2.强制清除缓存npm cache clean -force
        1.3.以管理员权限执行安装命令
    2.依赖包升级问题
        2.1.browserslist和caniuse-lite升级问题
            a.编译警告：Browserslist: caniuse-lite is outdated. Please run next command `npm update`
            b.解决办法：
                1.删除node_modules目录下的caniuse-lite和browserslist两个文件夹
                2.npm i caniuse-lite browserslist，注意package.json文件中的dependencies对象会增加依赖关系，删了即可
    3.node-sass兼容性问题
        3.1.npm update后会造成node-sass和nodejs不兼容问题
            a.编译错误：Cannot find module 'node-sass'
            b.解决方法：
                1.安装较新的Node.js 
                2.然后安装node-sass，命令：cnpm install node-sass@latest，或者安装指定版本（如：cnpm install node-sass@4.14.1）
    4.sass-loader版本太低警告
        a.编译警告：WARN A new version of sass-loader is available. Please upgrade for best experience.
        b.解决方法：
            1.先执行卸载命令->npm uninstall sass-loader 
            2.执行安装命令->npm install -D sass-loader@8.x
        c.重要提示：不宜安装太高的版本，可能不兼容
    5.安装cnpm错误
        a.错误信息：
            cnpm : 无法加载文件xxxxxxxxxxxxxx\npm\cnpm.ps1。未对文件 xxxxxxxxxxxxxx\npm\cnpm.ps1 进行数字签名。无法在当前系统上运行该脚本。有关运行脚本和设置执行策略的详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
        b.解决方案：
            1.首先此问题是权限原因导致。
            2.第一种方法：将VSCode工具设置为“以管理员方式运行”模式
            3.第二种方法：以管理员方式运行PowerShell工具，然后执行指令“set-ExecutionPolicy RemoteSigned”，在给出的选项中，选择“A”即可。
    6.安装Terser
        a.由于build模式的minify设置为terser，所以需要安装terser
        b.安装指令：npm install terser
    7.在vue页面中使用path报错
        a.错误信息：
            Module "path" has been externalized for browser compatibility. Cannot access "path.resolve" in client code.
        b.解决方案：
            1.安装依赖包：npm install path-browserify
            2.把“import path from 'path'”改为“import path from 'path-browserify'”
            

六、Vue知识
    1.生命周期
    1.1.选项式(Options)
        a.beforeCreate()：在实例加载之前，尚未设置计算属性、观察者、事件、数据属性和操作等内容。
        b.created()：实例已经初始化，激活了计算属性、观察者、事件、数据属性和随之而来的操作。
        c.beforeMount()：在DOM上挂载实例之前的那一刻，模板和作用域样式都在这里编译，但是你仍然无法操作DOM、元素属性仍然不可用。
        d.mounted()：现在可以进行数据适合模板、DOM元素替换为数据填充元素之类的操作了，元素属性现在也可以使用了。
        e.beforeUpdate()：在这里对需要更新DOM的数据进行更改。
        f.updated()：在对DOM更新之后立即调用。
        g.beforeDestroy()：在 Vue实例被销毁之前，实例和所有函数仍然完好无损并在此处工作。
        h.destroyed()：Vue实例都已被销毁，事件监听器和所有指令之类的东西在此阶段已被解除绑定。
    1.2.组合式(Composition)
        a.setup()：在组建创建时执行。可以简单理解为替代了选项式中的beforeCreate和created。
        b.onBeforeMount()：在挂载之前被调用，渲染函数render首次被调用。
        c.onMounted()：组件挂载时调用。
        d.onBeforeUpdate()：数据更新时调用，发生在虚拟DOM打补丁之前。
        e.onUpdated()：因数据更改导致的虚拟DOM重新渲染和打补丁时调用。
        f.onBeforeUnmount()：在卸载组件实例之前调用，此阶段的实例依旧是正常的。
        g.onUnmounted()：卸载组件实例后调用，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。
    

七、VSCode常用快捷键
    1.注释与取消注释：Ctrl+/ 
    2.代码缩进：Ctrl+[ 或 Ctrl+] 
    3.调用调试终端：Ctrl+、
    4.选择单词：Ctrl+D
    5.列选择快捷键
        a.windows：alt+shift+鼠标左键拖动
        b.mac：shift+option+鼠标左键拖动

八、总结
    1.上述规则规范属于标准编码规范，如遇特殊业务场景，可自行设计规则规范。
    2.源自“取自网络，还于网络”的理念，已此项目源码开放，但声明于先：请正确使用项目源码，如发生任何纠纷和违法行为，均于本人无关。
