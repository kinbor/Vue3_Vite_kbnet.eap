import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'
import copy from 'rollup-plugin-copy'
import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'
import { svgBuilder } from './src/styles/svg/svgBuilder'
import cfgSettings from './src/configs/eap/settings'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'public', // 静态资源服务的文件夹
  logLevel: 'info', // 控制台输出的级别'info' | 'warn' | 'error' | 'silent'
  clearScreen: true, // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
  build: {
    // 浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    // 指定输出路径
    outDir: 'dist',
    // 生成静态资源的存放路径
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    // 启用/禁用 CSS 代码拆分，如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    cssCodeSplit: true,
    css: {
      postcss: {
        plugins: [postcssPresetEnv]
      }
    },
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'vuex'],
          elementplus: ['element-plus'],
          echarts: ['echarts']
        }
      }
    },
    // 当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    /*
      设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器
      boolean | 'terser' | 'esbuild'
      terser 构建后文件体积更小
    */
    minify: 'terser',
    // 传递给 Terser 的更多 minify 选项。
    terserOptions: {
      compress: {
        drop_console: true, // 打包时删除console
        drop_debugger: true // 打包时删除 debugger
      }
    },
    // 设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    // 启用/禁用 brotli 压缩大小报告
    brotliSize: true,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 500
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock', // 根目录下的mock文件夹
      supportTs: false, // 如果使用typescript开发，则需要配置supportTs为true
      watchFiles: true // 监视文件更改
    }),
    viteCompression({
      threshold: 10240, // 体积大于10kb压缩
      filter: /\.(js|mjs|json|css|html)$/i,
      algorithm: 'gzip', // 压缩算法，gzip|brotliCompress|deflate|deflateRaw
      disable: false,
      deleteOriginFile: false // 是否删除源文件
    }),
    copy({
      targets: [
        { src: 'src/static', dest: 'dist' } // 执行拷贝
      ],
      hook: 'writeBundle' // notice here
    }),
    svgBuilder('./src/styles/svg/svgs/') // 这里已经将src/styles/svg/svgs/下的svg全部导入
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    host: cfgSettings.eap_spa_address,
    port: cfgSettings.eap_spa_port,
    https: cfgSettings.eap_spa_isHttps,
    strictPort: false, // 设为true时端口被占用则直接退出，不会尝试下一个可用端口
    cors: true, // 为开发服务器配置CORS, 默认启用并允许任何源
    open: true, // 服务启动时自动在浏览器中打开应用
    hmr: false, // 禁用或配置 HMR 连接
    // 传递给 chockidar 的文件系统监视器选项
    watch: {
      ignored: ['!**/node_modules/your-package-name/**']
    },
    proxy: {
      '/mock': {
        target: cfgSettings.eap_svc_mock_address, // 实际请求地址
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/mock/, '')
      }
    }
  }
})
