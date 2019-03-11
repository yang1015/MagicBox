//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {

      console.log("有全局变量")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("有获取头像昵称的按键")
      app.userInfoReadyCallback = res => {
        console.log("===userInfoReadyCallback===")
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("===========================")
      }
    } else {
      console.log("没有全局变量，且没有获取头像按键的情况。")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("点击获取用户信息button并且用户做出选择之后：")
    console.log(e)

    if (!e.detail.rawData) console.log("被拒绝授权了");
    else {
      console.log("成功获得授权"); 
      wx.switchTab({
        url: '../../tabs/map/map'
      }) 
    }
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
