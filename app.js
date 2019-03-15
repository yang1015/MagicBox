//app.js
import { isObjectEmpty } from './utils/util.js'
App({
  onLaunch: function() {
    // wx.authorize({
    //   scope: "scope.userLocation"
    // });
    console.log("APP ONLAUNCH")
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    /* 会弹窗 但是并不会调用真正的api */



    // 登录，获取一个5min过期的code
    /*
      返回用户的openId以及该id所对应的用户信息
      如果有信息，说明是老用户，直接渲染，不需要授权
      如果没有信息，说明是新用户，需要授权 
    */
    wx.login({
      success: res => {
        console.log("log in")
        // 把res.code发送给后端code2Session以换取openid(用户在当前程序的唯一标识), sessionkey和unionId(全平台卫衣标识)
        // ajax调用后端接口，传输res.code，后端接口返回openid以及userinfo
        let userInfo = {
          // avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEILO2spRM4slMg6wPSD54z2Hx61eBeskyEic9tLKsW6SRX44NicJIKn0YXjzV3okiczb0lovemhVCVqQ/132',
          // nickName: "L",
          // phone: 123,
          // washRecords: []
        }

        /* openid对应的userInfo为空 */
        if (isObjectEmpty(userInfo)) {
          console.log("新用户")
          wx.setStorageSync('hasUserInfo', false)
        } else {
          console.log("老用户");
          wx.setStorageSync('hasUserInfo', true)
          wx.setStorageSync('userInfo', JSON.stringify(userInfo));
        }


        wx.checkSession(); /* 检验session-key是否还在有效期内 */
      }
    });

  

    wx.reLaunch({
      url: '/tabs/map/map'
    });

    // 用户的授权状态
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log("已授权")
    //       wx.reLaunch({
    //         url: '/tabs/map/map'
    //       });
    //     } else {
    //       console.log("没有获得授权");
    //     }
    //   }
    // })
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