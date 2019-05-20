const app = getApp(); //通过getApp方法来引用全局对象

Page({
  data: {
    userInfo:{}
  },
  onLoad:function() {
    this.onGetUserInfo();
  },
  onGetUserInfo:function(e){
    app.getUserInfo((userInfo)=>{
      this.setData({ userInfo: userInfo })
    })
  },
})