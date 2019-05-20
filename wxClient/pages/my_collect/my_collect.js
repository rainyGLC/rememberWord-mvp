const app = getApp(); 

Page({
  data:{
    collectWord:[],
    userInfo: {},
  },
  onLoad:function(){//页面加载，一个页面只会调用一次，接收页面参数
    app.getUserInfo((userInfo)=> this.setData({ userInfo }))
    this.getData();
  },
  onShow:function(){//页面显示，每次打开页面都会调用一次
    this.getData();
  },
  getData:function(){
    let user_id = this.data.userInfo.user_id;
    console.log(user_id)
    wx.request({
      url:'http://localhost:3000/api/collect?user_id=' + user_id,
      method:'GET',
      success:(res) =>{
        let collectWord=res.data.data;
        this.setData({
          collectWord:res.data.data
        })
      }
    })
  }
})
