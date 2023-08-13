import LayoutEap from '@/layout/LayoutEap.vue'
import LayoutSpace from '@/layout/LayoutSpace.vue'

const eapRouter = [
  {
    path: '/',
    component: LayoutEap,
    redirect: '/space',
    hidden: true,
    meta: {
      id: 'e1',
      title: 'index',
      icon: 'global-index',
      ohidden: true,
      chidden: true
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/eap/login/login.vue'),
        hidden: true,
        meta: {
          id: 'e1_1',
          title: '登录',
          icon: 'global-login',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: '/logout',
        name: 'Logout',
        component: () => import('@/views/eap/login/logout.vue'),
        hidden: true,
        meta: {
          id: 'e1_2',
          title: '登出',
          icon: 'global-logout',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: '/findPwd',
        component: () => import('@/views/eap/login/findPwd.vue'),
        name: 'FindPwd',
        hidden: true,
        meta: {
          id: 'e1_3',
          title: '找回密码',
          icon: 'global-findPwd',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: '/resetPwd',
        component: () => import('@/views/eap/login/resetPwd.vue'),
        name: 'ResetPwd',
        hidden: true,
        meta: {
          id: 'e1_4',
          title: '重置密码',
          icon: 'global-resetPwd',
          ohidden: true,
          chidden: true
        }
      }
    ]
  },
  {
    path: '/space',
    component: LayoutSpace,
    redirect: '/space/index',
    hidden: true,
    meta: {
      id: 'e2',
      title: '平台空间',
      icon: 'global-index',
      ohidden: true,
      chidden: true
    },
    children: [
      {
        path: 'index',
        name: 'SpaceIndex',
        component: () => import('@/views/eap/space/index.vue'),
        hidden: true,
        meta: {
          id: 'e2_1',
          title: '空间主页',
          icon: 'global-index',
          ohidden: true,
          chidden: true
        }
      }
    ]
  }
]

export default eapRouter
