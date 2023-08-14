import router from '@/router'
import store from '@/store'
import { start, close } from '@/utils/nprogress'
import { token_get } from '@/core/browser/eap/token'
import genPageTitle from '@/utils/genPageTitle'
import eapOpen from '@/router/modules/eap_open'

router.beforeEach(async (to, from, next) => {
  // 1.开启进度条
  start()
  // 2.更改标题
  document.title = genPageTitle(to.meta.title)
  // 3.是否开放路由，开放路由不需要权限
  if (eapOpen.route_open.length > 0 && eapOpen.route_open.indexOf(to.path) !== -1) {
    next()
  } else {
    // 4.判断是否登录
    const hasToken = token_get()
    if (hasToken) {
      // a.已登录，且路由到白名单页面，直接跳转到主页面
      if (eapOpen.route_white.length > 0 && eapOpen.route_white.indexOf(to.path) !== -1) {
        next({ path: '/' })
        close()
      } else {
        if (store.getters.isPower) {
          // b.已登录，已加载权限数据
          if (to.meta && to.meta.chidden) {
            const rItem = store.getters.rights.find(right => right.Id === to.meta.id)
            if (rItem && rItem.CascadeId !== store.getters.module.id) {
              // 1.切换模块，目标页面所属模块非当前模块
              // 1.1.加载目标模块信息
              await store.dispatch('eap_rights/loadModules', rItem.CascadeId)
              // 1.2.加载目标路由信息
              await store.dispatch('eap_rights/reloadRoutes')
            }
          }
          next()
        } else {
          // c.已登录，未加载权限数据
          try {
            // 1.获取账号所属组织单位列表
            await store.dispatch('eap_rights/getUserOrgs')
            // 2.获取账号的用户数据
            await store.dispatch('eap_rights/getUserInfo')
            // 3.获取产品的权限数据
            await store.dispatch('eap_rights/getProductRights')
            // 4.权限路由计算完毕，重新加载页面。设置replace:true，导航就不会留下历史记录
            next({ ...to, replace: true })
          } catch (error) {
            // 加载权限数据失败，退出系统
            await store.dispatch('eap_rights/clearToken')
            next(`/login?redirect=${to.path}`)
            close()
          }
        }
      }
    } else {
      // a.未登录，白名单页面，跳转到目标页面
      if (eapOpen.route_white.length > 0 && eapOpen.route_white.indexOf(to.path) !== -1) {
        next()
      } else {
        // b.未登录，其他页面，跳转到登录页面
        next(`/login`)
        close()
      }
    }
  }
})
router.afterEach(() => {
  // n.关闭进度条
  close()
})
