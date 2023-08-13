export default [
    {
      url: '/Api/ProductApp/GetRightsById',
      method: 'get',
      response: (data) => {
        const tmpData=JSON.stringify([
              // {Id: '1', Type: 'Navigate|Module|Menu|Command', ParentId: '', CascadeId: '', OwnerId: ''}
              // Product
              {Id: 'p1', Type: 'Menu', ParentId: '', CascadeId: '', OwnerId: '' },
              // Product: Account
              {Id: 'p1_1', Type: 'Module', ParentId: '', CascadeId: 'p1', OwnerId: 'p1' },
              {Id: 'p1_1_1', Type: 'Menu', ParentId: '', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_1_1', Type: 'Menu', ParentId: 'p1_1_1', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_1_2', Type: 'Menu', ParentId: 'p1_1_1', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_1_3', Type: 'Menu', ParentId: 'p1_1_1', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2', Type: 'Menu', ParentId: '', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_1', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_2', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_3', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_4', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_5', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              {Id: 'p1_1_2_6', Type: 'Menu', ParentId: 'p1_1_2', CascadeId: 'p1_1', OwnerId: 'p1' },
              // Product: Resource
              {Id: 'p1_2', Type: 'Module', ParentId: '', CascadeId: 'p1', OwnerId: 'p1' },
              {Id: 'p1_2_1', Type: 'Menu', ParentId: '', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_1', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_2', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_3', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_4', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_10', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_11', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_12', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_13', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_20', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_21', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_22', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_23', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_30', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_31', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_32', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_33', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_40', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_41', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_42', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_43', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_50', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_51', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_52', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_1_53', Type: 'Menu', ParentId: 'p1_2_1', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_2', Type: 'Menu', ParentId: '', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_2_1', Type: 'Menu', ParentId: 'p1_2_2', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_2_2', Type: 'Menu', ParentId: 'p1_2_2', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_2_3', Type: 'Menu', ParentId: 'p1_2_2', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_3', Type: 'Menu', ParentId: '', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_3_1', Type: 'Menu', ParentId: 'p1_2_3', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_3_2', Type: 'Menu', ParentId: 'p1_2_3', CascadeId: 'p1_2', OwnerId: 'p1' },
              {Id: 'p1_2_3_3', Type: 'Menu', ParentId: 'p1_2_3', CascadeId: 'p1_2', OwnerId: 'p1' },
              // Product: System
              {Id: 'p1_3', Type: 'Module', ParentId: '', CascadeId: 'p1', OwnerId: 'p1' },
              {Id: 'p1_3_1', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_2', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_3', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_4', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_10', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_11', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_12', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
              {Id: 'p1_3_13', Type: 'Menu', ParentId: '', CascadeId: 'p1_3', OwnerId: 'p1' },
            ])
          return {
            MsgCode: '200',
            MsgData: tmpData,
            MsgError: ''
          }
      }
    }
  ]
  