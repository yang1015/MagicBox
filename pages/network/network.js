// pages/network/network.js

const data = require('../../mockData/network.js')
Page({

  /**
   * Page initial data
   */
  data: {
    networkList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    /* 在这里请求所有网点的数据 然后渲染 */
    console.log(data)
    this.setData({
      networkList: data
    })
  },

  getNetworkDetail(event){
    let networkId = event.currentTarget.dataset.networkid;
    // let currentNetworkDetail = this.data.networkList[networkId];

    /* 这样传数据不安全，在浏览器上可以看到具体data是什么 */
    // wx.navigateTo({
    //   url: '../network/network?networkDetail=' + JSON.stringify(currentNetworkDetail),
    // })

    wx.navigateTo({
      url: './network-detail/network-detail?networkId=' + networkId,
    })

  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady () {

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