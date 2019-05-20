Page({
  data:{
    word:[]
  },
  onLoad:function(option){
    let classify_id = option.classify_id;
    console.log(classify_id);
    this.getDate(classify_id)
  },
  getDate:function(classify_id){
    wx.request({
      url:'http://localhost:3000/api/word?classify_id=' + classify_id,
      success:(res) => {
        console.log(res.data)
        this.setData({
          word:res.data.data
        })
      }
    })
  }
})