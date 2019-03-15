//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到即刻魔方无人洗车',
    userInfo: {},
    hasUserInfo: false,
    /* 判断小程序的API，回调，参数，组件等是否在当前版本可用。 */
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    /* 老用户，允许授权，有数据可以回填，已经在app,js里存储在globalData中 */
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("有获取头像昵称的按键")
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }  
  },
  getUserInfo: function(e) {
    console.log("触发getUserInfo")

    /* e.detail里会返回加密数据 */
    if (!e.detail.rawData) {
     console.log("拒绝授权")
    } else {
      console.log("允许授权，并拿到用户信息"); 

      /* 赋值给全局变量了 其他组件可以直接调用 */
      console.log(e.detail.rawData);
      app.globalData.userInfo = JSON.parse(e.detail.rawData);

      this.setData({
        userInfo: e.detail.rawData,
        hasUserInfo: true
      });

      wx.setStorageSync({
        key: 'userInfo',
        data: e.detail.rawData
      })

      // console.log(app.globalData)
      wx.switchTab({url: '../../tabs/map/map'});
    }
  },

  onUnload(){
   
  }
})




// else {
//   console.log("没有全局变量，且没有获取头像按键的情况。")
//   // 在没有 open-type=getUserInfo 版本的兼容处理
//   wx.getUserInfo({
//     success: res => {
//       app.globalData.userInfo = res.userInfo
//       this.setData({
//         userInfo: res.userInfo,
//         hasUserInfo: true
//       })
//     }
//   })
// }