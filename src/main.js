import * as Vue from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zh_cn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ECharts from 'vue-echarts'
import SvgIcon from './styles/svg/index.vue'
import App from './App.vue'

import i18n from './locales/index'
import router from './router/index'
import store from './store/index'

import '@/core/rights'
import '@/styles/scss/index.scss'

const app = Vue.createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus, { locale: zh_cn })
app.component('KbECharts', ECharts)
// eslint-disable-next-line vue/component-definition-name-casing
app.component('v-chart', SvgIcon)
app.component('KbSvgIcon', SvgIcon)
// eslint-disable-next-line vue/component-definition-name-casing
app.component('svg-icon', SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
