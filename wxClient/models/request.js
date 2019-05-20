const requset = function(params={}){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: params.url,
      method: params.method || 'get',
      data: params.data || {},
      header: params.headers,
      success: (res)=>{
        if(res.data.code == 200){
          resolve(res.data)
        }else{
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
module.exports = requset
