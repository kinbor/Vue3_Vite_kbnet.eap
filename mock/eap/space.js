export default [
  {
    url: '/Api/EapSpace/GetBoxListByBoxId',
    method: 'get',
    response: (data) => {
      if (data.query.boxId === '') {
        const tmpData=JSON.stringify([
            // TargetMethod：New|Replace
            {Id:'1',Name:'Test1',IsSvg:false,SvgColor:'color:#009dff',ImgData:'/src/static/images/globals/global-product-blue.png',DisabledTip:true,HasChild:true,ParentId:'',TargetAddress: '',TargetMethod:'New'},
            {Id:'2',Name:'Test2',IsSvg:false,SvgColor:'color:#009dff',ImgData:'/src/static/images/globals/global-product-blue.png',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress: '',TargetMethod:'New'},
            {Id:'3',Name:'Test3',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-b',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress: '',TargetMethod:'New'},
            {Id:'4',Name:'Test4',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-b',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress: '',TargetMethod:'New'},
            {Id:'5',Name:'Test5',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-b',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress: '',TargetMethod:'New'},
            {Id:'11',Name:'Test1_Svg',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-a',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress:'',TargetMethod:'New'},
            {Id:'12',Name:'Test2_Svg',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-a',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress:'',TargetMethod:'New'},
            {Id:'13',Name:'Test3_Svg',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-c',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress:'',TargetMethod:'New'},
            {Id:'14',Name:'Test4_Svg',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-c',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress:'',TargetMethod:'New'},
            {Id:'15',Name:'Test5_Svg',IsSvg:true,SvgColor:'color:#009dff',ImgData:'global-product-c',DisabledTip:true,HasChild:false,ParentId:'',TargetAddress:'',TargetMethod:'New'}
        ])
        return {
          MsgCode: '200',
          MsgData: tmpData,
          MsgError: ''
        }
      } else if (data.query.boxId === '1') {
        const tmpData=JSON.stringify([
          {Id:'1_1',Name:'Test1_1',IsSvg:true,SvgColor:'color:#009dff',ImgData:'rsc-module',DisabledTip:true,HasChild:true,ParentId:'1',TargetAddress:'',TargetMethod:'New'},
          {Id:'1_2',Name:'Test1_2',IsSvg:true,SvgColor:'color:#009dff',ImgData:'rsc-module',DisabledTip:true,HasChild:true,ParentId:'1',TargetAddress:'',TargetMethod:'New'},
          {Id:'1_3',Name:'Test1_3',IsSvg:true,SvgColor:'color:#009dff',ImgData:'rsc-module',DisabledTip:true,HasChild:false,ParentId:'1',TargetAddress:'/product',TargetMethod:'Replace'}
        ])
        return {
          MsgCode: '200',
          MsgData: tmpData,
          MsgError: ''
        }
      } else if (data.query.boxId === '1_1') {
        const tmpData=JSON.stringify([
          {Id:'1_1_1',Name:'Test1_1_1',IsSvg:true,SvgColor:'color:#009dff',ImgData:'rsc-module',DisabledTip:true,HasChild:false,ParentId:'1_1',TargetAddress:'',TargetMethod:'New'},
          {Id:'1_1_2',Name:'Test1_1_2',IsSvg:true,SvgColor:'color:#009dff',ImgData:'rsc-menu',DisabledTip:true,HasChild:false,ParentId:'1_1',TargetAddress:'/product',TargetMethod:'Replace'}
        ])
        return {
          MsgCode: '200',
          MsgData: tmpData,
          MsgError: ''
        }
      }
    }
  }
]
