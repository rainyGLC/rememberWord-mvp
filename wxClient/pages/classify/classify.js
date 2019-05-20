Page({
  data:{
    classify:[]
  },
  onLoad:function(options) {
    // console.log(options)
    this.getData();
  },
  getData: function() {
    wx.request({
      url:"http://localhost:3000/api/classify",
      success:(res) => {
        // console.log(res.data);
        this.setData({
          classify:res.data.data
        })
      }
    })
  }
})
