//app.js
App({
  onLaunch: function() {
  },
  //回调函数
  getUserInfo: function(callback) {
    if(this.globalData.userInfo.user_id) {
      typeof callback === 'function' && callback(this.globalData.userInfo)
      return
    }
    let userInfoStorage = wx.getStorageSync('userInfo');
    if(userInfoStorage) {
      typeof callback === 'function' && callback(userInfoStorage);
      this.globalData.userInfo = userInfoStorage;
      return
    }
    console.log('---1')
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              let userInfo = res.userInfo;
              wx.login({ //获取用户id
                success:res=> {
                  if (res.code) {
                    // 发起网络请求
                    wx.request({
                      url: 'http://localhost:3000/api/login',
                      data: {
                        code: res.code
                      },
                      method:'POST',
                      success:res=>{
                        userInfo.user_id = res.data.data
                        this.globalData.userInfo = userInfo
                        wx.setStorageSync('userInfo', userInfo);
                        typeof callback === 'function' && callback(userInfo);
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                    typeof callback === 'function' && callback({});
                  }
                },
                fail: err => {
                  console.log('0001', err)
                  typeof callback === 'function' && callback({});
                }
              })
            },
            fail: err => {
              console.log('0002')
              typeof callback === 'function' && callback({});
            }
          })
        }else{
          console.log('0003')
          typeof callback === 'function' && callback({});
        }
      },
      fail: err => {
        console.log('0004')
        typeof callback === 'function' && callback({});
      }
    })
  },
  //proimse方法
  getUserInfo2: function() {
    if(this.globalData.userInfo.user_id) {
      return Promise.resolve(this.globalData.userInfo)
    }

    let userInfoStorage = wx.getStorageSync('userInfo');
    if(userInfoStorage) {
      this.globalData.userInfo = userInfoStorage;
      return Promise.resolve(userInfoStorage)
    }

    return new Promise((resolve, reject)=> {
      wx.getSetting({
        success: res => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: res => {
                let userInfo = res.userInfo;
                wx.login({ //获取用户id
                  success:res=> {
                    if (res.code) {
                      // 发起网络请求
                      wx.request({
                        url: 'http://localhost:3000/api/login',
                        data: {
                          code: res.code
                        },
                        method:'POST',
                        success:res=>{
                          userInfo.user_id = res.data.data
                          this.globalData.userInfo = userInfo
                          wx.setStorageSync('userInfo', userInfo);
                          resolve(userInfo);
                        }
                      })
                    } else {
                      console.log('登录失败！' + res.errMsg)
                      resolve({});
                    }
                  },
                  fail: err => {
                    console.log('0001', err)
                    resolve({});
                  }
                })
              },
              fail: err => {
                console.log('0002')
                resolve({});
              }
            })
          }else{
            console.log('0003')
            resolve({});
          }
        },
        fail: err => {
          console.log('0004')
          resolve({});
        }
      })
    })
  },
  
  globalData: {
    userInfo: {}
  }
})