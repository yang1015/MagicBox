//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    /* 会弹窗 但是并不会调用真正的api */
    wx.authorize({scope: "scope.userLocation"});

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 用户的授权状态
    wx.getSetting({
      success: res => {
        console.log(res.authSetting); 
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("已授权 即将跳转map tab")
          wx.reLaunch({url: '/tabs/map/map'});
        } else {
          console.log("没有获得授权");
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
});



// wx.getUserInfo({
          //   success: res => {// 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // });
