export default [
  {
    url: '/Api/EapAccount/GetInfoByOrgId',
    method: 'get',
    response: () => {
      const tmpData=JSON.stringify({
        Id: '88888888888888888888',
        Name: '张三',
        Avatar: '/src/static/images/avatar/avatar_boy.png',
        Rights: [
          // {Id: '1', Type: 'Navigate|Module|Menu|Command', ParentId: '', CascadeId: '', OwnerId: ''}
          // EAP
          {Id: 'e1', Type: 'Module', ParentId: '', CascadeId: '', OwnerId: '' },
          {Id: 'e1_1', Type: 'Menu', ParentId: '', CascadeId: 'e1', OwnerId: 'e1' },
          {Id: 'e1_2', Type: 'Menu', ParentId: '', CascadeId: 'e1', OwnerId: 'e1' },
          {Id: 'e1_3', Type: 'Menu', ParentId: '', CascadeId: 'e1', OwnerId: 'e1' },
          {Id: 'e1_4', Type: 'Menu', ParentId: '', CascadeId: 'e1', OwnerId: 'e1' },
          // Space
          {Id: 'e2', Type: 'Module', ParentId: '', CascadeId: '', OwnerId: '' },
          {Id: 'e2_1', Type: 'Menu', ParentId: '', CascadeId: 'e2', OwnerId: 'e2' }
        ],
        Settings: [
          {SKey: 'tool_light', SValue: '100'},
          {SKey: 'tool_theme', SValue: 'default'}
        ]
      })
      return {
        MsgCode: '200',
        MsgData: tmpData,
        MsgError: ''
      }
    }
  },
  {
    url: '/Api/EapAccount/GetOrgListByUserId',
    method: 'get',
    response: () => {
      const tmpData=JSON.stringify([{OrgId: '99999999999999999999', OrgFullName: 'KBNET',OrgShortName: 'KBNET', IsDefault:true}])
      return {
        MsgCode: '200',
        MsgData: tmpData,
        MsgError: ''
      }
    }
  }
]
