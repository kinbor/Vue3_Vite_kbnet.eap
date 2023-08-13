import tdata from './testdata'

export default [
  {
    url: '/Api/EapCaptcha/SlideImage',
    method: 'get',
    response: () => {
      const tmpData = JSON.stringify({
        Id:'556219872656632',
        Image_Base64: tdata.captcha_image_bg_data,
        Image2_Base64: tdata.captcha_image_sb_data,
        Image2_Offset_X: -3,
        Image2_Offset_Y: 77
      })
      return {
        MsgCode: '200',
        MsgData: tmpData,
        MsgError: '验证成功'
      }
    }
  },
  {
    url: '/Api/EapCaptcha/Verify',
    method: 'post',
    response: data => {
      const data1=67-2
      const data2=67+2
      if (data.body.DataCode) {
        if (data.body.DataCode>=data1 && data.body.DataCode<=data2) {
          return {
            MsgCode: '200',
            MsgData: 'successed',
            MsgError: '验证成功'
          }
        }
      }
      return {
        MsgCode: '700',
        MsgData: 'failure',
        MsgError: '验证失败'
      }
    }
  },
  {
    url: '/Api/EapLogin/EncryptCode',
    method: 'get',
    response: () => {
      return {
        MsgCode: '200',
        MsgData: '{\"Id\":\"203726612498219017\",\"Code\":\"-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsqwhB8nEOrI44ADXt7mq4CAaaHLc1mTLKeb4wr9YyHqLAc6MWIcxCDXboFNJf8KctLcNHSplw3DIx8JNTPmmneuimk+coM0F/2at1oN2QRWVFjbDY4787VvqFd5UJsTrf7zzdhR8SDXGQd5sorS0B5ZCtKu1M/aOtV4gLkYGTnQIDAQAB-----END PUBLIC KEY-----\"}',
        MsgError: null
      }
    }
  },
  {
    url: '/Api/EapLogin/Login',
    method: 'post',
    response: data => {
      return {
        MsgCode: '200',
        MsgData: 'successed',
        MsgError: ''
      }
    }
  },
  {
    url: '/Api/EapLogin/Logout',
    method: 'get',
    response: () => {
      return {
        MsgCode: '200',
        MsgData: '',
        MsgError: ''
      }
    }
  },
  {
    url: '/Api/EapLogin/FindPwd_Code',
    method: 'get',
    response: () => {
      return {
        MsgCode: '200',
        MsgData: '5347975945862142',
        MsgError: ''
      }
    }
  },
  {
    url: '/Api/EapLogin/FindPwd_Verify',
    method: 'get',
    response: () => {
      return {
        MsgCode: '200',
        MsgData: '',
        MsgError: ''
      }
    }
  },
  {
    url: '/Api/EapLogin/FindPwd_Reset',
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
