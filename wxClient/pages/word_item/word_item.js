const app = getApp(); 

Page({
  data:{
    word:{},
    isCollected:false,
    userInfo: {},
    id:''
  },
  onLoad: function(option){
    let id = option.id;
    this.setData({id:id});
    console.log(id)
    this.getDate(id);
    app.getUserInfo((userInfo)=> this.setData({ userInfo }))
    // app.getUserInfo2().then( userInfo => this.setData({ userInfo }))
    // let userInfo = await app.getUserInfo2()
    this.getCollected();
  },
  getCollected(){
    let user_id = this.data.userInfo.user_id;
    let word_id = this.data.id;
    console.log(word_id);
    let isCollected = this.data.isCollected;
    wx.request({
      url:'http://localhost:3000/api/collectId?user_id=' + user_id + '&word_id=' + word_id,
      method:'GET',
      success:(res) =>{
        console.log(res.data);
        if(res.data.code ==200){
          this.setData({isCollected:res.data.data})
        }
      }
    })
  },
  getDate(id){
    wx.request({
      url:'http://localhost:3000/api/word/' + id,
      success:(res) => {
        // console.log(res.data)
        this.setData({
          word:res.data.data
        })
      }
    })
  },
  handleCollect(){
    let isCollected = !this.data.isCollected;
    this.setData({isCollected})
    let user_id = this.data.userInfo.user_id;
    console.log(user_id);
    let word_id = this.data.id;
    console.log(word_id);
    let title = isCollected ? '收藏成功' : '取消收藏'
    if(isCollected) {
      wx.request({
        url:'http://localhost:3000/api/collect',
        method:'POST',
        data:{
          user_id:user_id,
          word_id:word_id
      },
      success:(res) => {
        if(res.data.code==200) {
          console.log(res.data.code,'hhh')
          wx.showToast({
            title,
            icon:'success'
          })
        }
      }
      })
    }else{
      wx.request({
        url: 'http://localhost:3000/api/collectDetele?user_id='+ user_id + '&word_id=' + word_id,
        method:'DELETE',
        success:(res) =>{
          console.log(res)
          if(res.data.code==200) {
            console.log(res.data.code,'aaaaa')
            wx.showToast({
              title,
              icon:'success'
            })
          }
        }
      })
    }
  }
})