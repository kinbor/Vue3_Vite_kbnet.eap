export default [
  {
    url: '/Api/EapSettings/ToolSet',
    method: 'get',
    response: () => {
      return {
        MsgCode: '200',
        MsgData: '',
        MsgError: ''
      }
    }
  }
]
