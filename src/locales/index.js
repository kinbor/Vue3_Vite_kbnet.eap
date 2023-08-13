import { createI18n } from 'vue-i18n' // 引入vue-i18n组件
import zh_cn from './zh_cn' // 中文语言包
import en_us from './en_us' // 英文语言包

// 实例化I18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh_cn', // 初始化配置语言
  messages: {
    zh_cn,
    en_us
  }
})
export default i18n
