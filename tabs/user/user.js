// user/user.js
import { isObjectEmpty } from '../../utils/util.js'
const app = getApp();
Page({
  /**
   * Page initial data
   */
  data: {
    // userInfo: wx.getStorageSync('hasUserInfo')? JSON.parse(wx.getStorageSync("userInfo")) : null,
    // avatarUrl: wx.getStorageSync('hasUserInfo')? JSON.parse(wx.getStorageSync("userInfo")).avatarUrl : "../../images/marker.png",
    userInfo: {},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * Lifecycle function--Called when page load
   */

  /*
  a. 用户首次进入 未授权（未登录）
  b. 用户非首次登陆 已授权 app.js根据openid取userInfo存在storage，直接回填
  c. 用户非首次登陆 未授权（未登录）

  
   */
  onLoad: function (options) {
     
    /* 检测当前用户是否授权过/是否有数据可以回填 
    在app.js一开始加载，就有wx.login去判断该openId是否有对应的用户数据，并储存在storage里*/

    if (wx.getStorageSync('hasUserInfo')) {
      console.log("用户已经授权，显示头像等等");
      /* 以前授权过 有userInfo 直接回填 */
      let userInfoInStorage = JSON.parse(wx.getStorageSync("userInfo"))
      this.setData({
        userInfo: userInfoInStorage,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("有获取头像昵称的按键")
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log("该用户未授权")
      this.setData({
        hasUserInfo: false
      })
    
    } 
  },
  getUserInfo(e) {
    console.log("触发getUserInfo")
    /* e.detail里会返回加密数据 */
    if (!e.detail.rawData) {
      console.log("拒绝授权")
    } else {
      console.log("允许授权，并拿到用户信息");

      /* 赋值给全局变量了 其他组件可以直接调用 */
      console.log(e.detail);
      
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        canIUser: false
      });

      console.log(this.data)
      wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
      wx.setStorageSync('hasUserInfo', true);
    }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})