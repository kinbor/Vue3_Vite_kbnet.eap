const errorRouter = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/NotFound',
    hidden: true,
    meta: {
      id: '2235762723268859999',
      title: '星号',
      icon: 'error-all',
      ohidden: true,
      chidden: true
    }
  },
  {
    path: '/NotFound',
    component: () => import('@/views/errors/404.vue'),
    hidden: true,
    meta: {
      id: '2235762723268859998',
      title: '404页面不存在',
      icon: 'error-404',
      ohidden: true,
      chidden: true
    }
  }
]

export default errorRouter
