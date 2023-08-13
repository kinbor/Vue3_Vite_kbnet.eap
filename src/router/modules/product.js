import layoutProduct from '@/layout/layoutProduct.vue'

const productRouter = [
  {
    path: '/product',
    component: layoutProduct,
    redirect: '/product/account',
    hidden: true,
    meta: {
      id: 'p1',
      title: '产品主页',
      icon: 'product-index',
      ohidden: true,
      chidden: true
    }
  },
  {
    path: '/product/account',
    component: layoutProduct,
    redirect: '/product/account/person',
    hidden: false,
    meta: {
      id: 'p1_1',
      title: '账户管理',
      icon: 'product-account',
      ohidden: false,
      chidden: false
    },
    children: [
      {
        path: 'person',
        name: 'PdtActPsn',
        redirect: '/product/account/person/info',
        hidden: false,
        meta: {
          id: 'p1_1_1',
          title: '个人信息',
          icon: 'product-account-person',
          ohidden: false,
          chidden: false
        },
        children: [
          {
            path: 'info',
            name: 'PdtActPsnInfo',
            component: () => import('@/views/product/accounts/person/PdtActPsnInfo.vue'),
            hidden: false,
            meta: {
              id: 'p1_1_1_1',
              title: '个人资料',
              icon: 'product-account-person-info',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'edit',
            name: 'PdtActPsnEdit',
            component: () => import('@/views/product/accounts/person/PdtActPsnEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_1_1_2',
              title: '个人资料编辑',
              icon: 'product-account-person-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'editPwd',
            name: 'PdtActPsnEditPwd',
            component: () => import('@/views/product/accounts/person/PdtActPsnEditPwd.vue'),
            hidden: false,
            meta: {
              id: 'p1_1_1_3',
              title: '修改密码',
              icon: 'product-account-person-editpwd',
              ohidden: false,
              chidden: false
            }
          }
        ]
      },
      {
        path: 'mgt',
        name: 'PdtActMgt',
        redirect: '/product/account/mgt/index',
        hidden: false,
        meta: {
          id: 'p1_1_2',
          title: '账户信息',
          icon: 'product-account-management',
          ohidden: false,
          chidden: false
        },
        children: [
          {
            path: 'index',
            name: 'PdtActMgtIndex',
            component: () => import('@/views/product/accounts/management/PdtActMgt.vue'),
            hidden: false,
            meta: {
              id: 'p1_1_2_1',
              title: '账户查询',
              icon: 'product-account-management-index',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'detail',
            name: 'PdtActMgtDetail',
            component: () => import('@/views/product/accounts/management/PdtActMgtDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_1_2_2',
              title: '详细信息',
              icon: 'product-account-management-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'edit',
            name: 'PdtActMgtEdit',
            component: () => import('@/views/product/accounts/management/PdtActMgtEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_1_2_3',
              title: '编辑信息',
              icon: 'product-account-management-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'editPwd',
            name: 'PdtActMgtEditPwd',
            component: () => import('@/views/product/accounts/management/PdtActMgtEditPwd.vue'),
            hidden: true,
            meta: {
              id: 'p1_1_2_4',
              title: '重置密码',
              icon: 'product-account-management-editPwd',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'pdt',
            name: 'PdtActMgtPdt',
            component: () => import('@/views/product/accounts/management/PdtActMgtPdt.vue'),
            hidden: true,
            meta: {
              id: 'p1_1_2_5',
              title: '账户产品',
              icon: 'product-account-management-pdt',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'new',
            name: 'PdtActMgtNew',
            component: () => import('@/views/product/accounts/management/PdtActMgtNew.vue'),
            hidden: false,
            meta: {
              id: 'p1_1_2_6',
              title: '注册账户',
              icon: 'product-account-management-new',
              ohidden: false,
              chidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/product/resource',
    component: layoutProduct,
    redirect: '/product/resource/obj',
    hidden: false,
    meta: {
      id: 'p1_2',
      title: '资源管理',
      icon: 'product-resource',
      ohidden: false,
      chidden: false
    },
    children: [
      {
        path: 'obj',
        name: 'PdtRscObj',
        redirect: '/product/resource/obj/pdt',
        hidden: false,
        meta: {
          id: 'p1_2_1',
          title: '对象管理',
          icon: 'product-resource-object',
          ohidden: false,
          chidden: false
        },
        children: [
          // 产品信息
          {
            path: 'pdt',
            name: 'PdtRscObjPdt',
            component: () => import('@/views/product/resources/objects/product/PdtRscObjPdt.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_1',
              title: '产品信息',
              icon: 'product-resource-object-pdt',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'pdtDetail',
            name: 'PdtRscObjPdtDetail',
            component: () =>
              import('@/views/product/resources/objects/product/PdtRscObjPdtDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_2',
              title: '详细信息',
              icon: 'product-resource-object-pdt-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'pdtEdit',
            name: 'PdtRscObjPdtEdit',
            component: () =>
              import('@/views/product/resources/objects/product/PdtRscObjPdtEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_3',
              title: '编辑信息',
              icon: 'product-resource-object-pdt-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'pdtNew',
            name: 'PdtRscObjPdtNew',
            component: () =>
              import('@/views/product/resources/objects/product/PdtRscObjPdtNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_4',
              title: '新增信息',
              icon: 'product-resource-object-pdt-new',
              ohidden: true,
              chidden: true
            }
          },

          // 程序信息
          {
            path: 'app',
            name: 'PdtRscObjApp',
            component: () =>
              import('@/views/product/resources/objects/application/PdtRscObjApp.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_10',
              title: '程序信息',
              icon: 'product-resource-object-app',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'appDetail',
            name: 'PdtRscObjAppDetail',
            component: () =>
              import('@/views/product/resources/objects/application/PdtRscObjAppDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_11',
              title: '详细信息',
              icon: 'product-resource-object-app-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'appEdit',
            name: 'PdtRscObjAppEdit',
            component: () =>
              import('@/views/product/resources/objects/application/PdtRscObjAppEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_12',
              title: '编辑信息',
              icon: 'product-resource-object-app-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'appNew',
            name: 'PdtRscObjAppNew',
            component: () =>
              import('@/views/product/resources/objects/application/PdtRscObjAppNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_13',
              title: '新增信息',
              icon: 'product-resource-object-app-new',
              ohidden: true,
              chidden: true
            }
          },

          // 模块信息
          {
            path: 'module',
            name: 'PdtRscObjMdl',
            component: () => import('@/views/product/resources/objects/module/PdtRscObjMdl.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_20',
              title: '模块信息',
              icon: 'product-resource-object-module',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'moduleDetail',
            name: 'PdtRscObjMdlDetail',
            component: () =>
              import('@/views/product/resources/objects/module/PdtRscObjMdlDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_21',
              title: '详细信息',
              icon: 'product-resource-object-module-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'moduleEdit',
            name: 'PdtRscObjMdlEdit',
            component: () =>
              import('@/views/product/resources/objects/module/PdtRscObjMdlEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_22',
              title: '编辑信息',
              icon: 'product-resource-object-module-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'moduleNew',
            name: 'PdtRscObjMdlNew',
            component: () => import('@/views/product/resources/objects/module/PdtRscObjMdlNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_23',
              title: '新增信息',
              icon: 'product-resource-object-module-new',
              ohidden: true,
              chidden: true
            }
          },

          // 菜单信息
          {
            path: 'menu',
            name: 'PdtRscObjMenu',
            component: () => import('@/views/product/resources/objects/menu/PdtRscObjMenu.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_30',
              title: '菜单信息',
              icon: 'product-resource-object-menu',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'menuDetail',
            name: 'PdtRscObjMenuDetail',
            component: () =>
              import('@/views/product/resources/objects/menu/PdtRscObjMenuDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_31',
              title: '详细信息',
              icon: 'product-resource-object-menu-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'menuEdit',
            name: 'PdtRscObjMenuEdit',
            component: () => import('@/views/product/resources/objects/menu/PdtRscObjMenuEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_32',
              title: '编辑信息',
              icon: 'product-resource-object-menu-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'menuNew',
            name: 'PdtRscObjMenuNew',
            component: () => import('@/views/product/resources/objects/menu/PdtRscObjMenuNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_33',
              title: '新增信息',
              icon: 'product-resource-object-menu-new',
              ohidden: true,
              chidden: true
            }
          },

          // 命令信息
          {
            path: 'cmd',
            name: 'PdtRscObjCmd',
            component: () => import('@/views/product/resources/objects/command/PdtRscObjCmd.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_40',
              title: '命令信息',
              icon: 'product-resource-object-cmd',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'cmdDetail',
            name: 'PdtRscObjCmdDetail',
            component: () =>
              import('@/views/product/resources/objects/command/PdtRscObjCmdDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_41',
              title: '详细信息',
              icon: 'product-resource-object-cmd-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'cmdEdit',
            name: 'PdtRscObjCmdEdit',
            component: () =>
              import('@/views/product/resources/objects/command/PdtRscObjCmdEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_42',
              title: '编辑信息',
              icon: 'product-resource-object-cmd-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'cmdNew',
            name: 'PdtRscObjCmdNew',
            component: () =>
              import('@/views/product/resources/objects/command/PdtRscObjCmdNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_43',
              title: '新增信息',
              icon: 'product-resource-object-cmd-new',
              ohidden: true,
              chidden: true
            }
          },

          // 角色信息
          {
            path: 'role',
            name: 'PdtRscObjRole',
            component: () => import('@/views/product/resources/objects/role/PdtRscObjRole.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_1_50',
              title: '角色信息',
              icon: 'product-resource-object-role',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'roleDetail',
            name: 'PdtRscObjRoleDetail',
            component: () =>
              import('@/views/product/resources/objects/role/PdtRscObjRoleDetail.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_51',
              title: '详细信息',
              icon: 'product-resource-object-role-detail',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'roleEdit',
            name: 'PdtRscObjRoleEdit',
            component: () => import('@/views/product/resources/objects/role/PdtRscObjRoleEdit.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_52',
              title: '编辑信息',
              icon: 'product-resource-object-role-edit',
              ohidden: true,
              chidden: true
            }
          },
          {
            path: 'roleNew',
            name: 'PdtRscObjRoleNew',
            component: () => import('@/views/product/resources/objects/role/PdtRscObjRoleNew.vue'),
            hidden: true,
            meta: {
              id: 'p1_2_1_53',
              title: '新增信息',
              icon: 'product-resource-object-role-new',
              ohidden: true,
              chidden: true
            }
          }
        ]
      },
      {
        path: 'reg',
        name: 'PdtRscReg',
        redirect: '/product/resource/reg/userRole',
        hidden: false,
        meta: {
          id: 'p1_2_2',
          title: '注册管理',
          icon: 'product-resource-register',
          ohidden: false,
          chidden: false
        },
        children: [
          {
            path: 'userRole',
            name: 'PdtRscRegUserAndRole',
            component: () => import('@/views/product/resources/registers/PdtRscRegUserAndRole.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_2_1',
              title: '用户注册角色',
              icon: 'product-resource-register-userrole',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'userProduct',
            name: 'PdtRscRegUserAndProduct',
            component: () =>
              import('@/views/product/resources/registers/PdtRscRegUserAndProduct.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_2_2',
              title: '用户注册产品',
              icon: 'product-resource-register-userproduct',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'roleResource',
            name: 'PdtRscRegRoleAndResource',
            component: () =>
              import('@/views/product/resources/registers/PdtRscRegRoleAndResource.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_2_3',
              title: '角色注册资源',
              icon: 'product-resource-register-roleResource',
              ohidden: false,
              chidden: false
            }
          }
        ]
      },
      {
        path: 'orm',
        name: 'PdtRscOrm',
        redirect: '/product/resource/orm/app',
        hidden: false,
        meta: {
          id: 'p1_2_3',
          title: '映射管理',
          icon: 'product-resource-orm',
          ohidden: false,
          chidden: false
        },
        children: [
          {
            path: 'app',
            name: 'PdtRscOrmApp',
            component: () => import('@/views/product/resources/orms/PdtRscOrmApp.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_3_1',
              title: '程序映射',
              icon: 'product-resource-orm-app',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'role',
            name: 'PdtRscOrmRole',
            component: () => import('@/views/product/resources/orms/PdtRscOrmRole.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_3_2',
              title: '角色映射',
              icon: 'product-resource-orm-role',
              ohidden: false,
              chidden: false
            }
          },
          {
            path: 'rsc',
            name: 'PdtRscOrmRsc',
            component: () => import('@/views/product/resources/orms/PdtRscOrmRsc.vue'),
            hidden: false,
            meta: {
              id: 'p1_2_3_3',
              title: '资源映射',
              icon: 'product-resource-orm-resource',
              ohidden: false,
              chidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/product/system',
    component: layoutProduct,
    redirect: '/product/system/dict',
    hidden: false,
    meta: {
      id: 'p1_3',
      title: '系统管理',
      icon: 'product-system',
      ohidden: false,
      chidden: false
    },
    children: [
      // 数据字典
      {
        path: 'dict',
        name: 'PdtSysDict',
        component: () => import('@/views/product/systems/dictionary/PdtSysDict.vue'),
        hidden: false,
        meta: {
          id: 'p1_3_1',
          title: '数据字典',
          icon: 'product-system-dict',
          ohidden: false,
          chidden: false
        }
      },
      {
        path: 'dictDetail',
        name: 'PdtSysDictDetail',
        component: () => import('@/views/product/systems/dictionary/PdtSysDictDetail.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_2',
          title: '详细信息',
          icon: 'product-system-dict-detail',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: 'dictEdit',
        name: 'PdtSysDictEdit',
        component: () => import('@/views/product/systems/dictionary/PdtSysDictEdit.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_3',
          title: '编辑信息',
          icon: 'product-system-dict-edit',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: 'dictNew',
        name: 'PdtSysDictNew',
        component: () => import('@/views/product/systems/dictionary/PdtSysDictNew.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_4',
          title: '新增信息',
          icon: 'product-system-dict-new',
          ohidden: true,
          chidden: true
        }
      },

      // 字典类型
      {
        path: 'dictType',
        name: 'PdtSysDictType',
        component: () => import('@/views/product/systems/dictionaryType/PdtSysDictType.vue'),
        hidden: false,
        meta: {
          id: 'p1_3_10',
          title: '字典类型',
          icon: 'product-system-dictType',
          ohidden: false,
          chidden: false
        }
      },
      {
        path: 'dictTypeDetail',
        name: 'PdtSysDictTypeDetail',
        component: () => import('@/views/product/systems/dictionaryType/PdtSysDictTypeDetail.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_11',
          title: '详细信息',
          icon: 'product-system-dictType-detail',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: 'dictTypeEdit',
        name: 'PdtSysDictTypeEdit',
        component: () => import('@/views/product/systems/dictionaryType/PdtSysDictTypeEdit.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_12',
          title: '编辑信息',
          icon: 'product-system-dictType-edit',
          ohidden: true,
          chidden: true
        }
      },
      {
        path: 'dictTypeNew',
        name: 'PdtSysDictTypeNew',
        component: () => import('@/views/product/systems/dictionaryType/PdtSysDictTypeNew.vue'),
        hidden: true,
        meta: {
          id: 'p1_3_13',
          title: '新增信息',
          icon: 'product-system-dictType-new',
          ohidden: true,
          chidden: true
        }
      }
    ]
  }
]

export default productRouter
