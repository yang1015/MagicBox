// map/map.js
// 经度 Longitude 简写Lng 纬度 Latitude 简写Lat

const app = getApp();
let locationData = require('../../mockData/network.js')

Page({

  /**
   * Page initial data
   */
  data: {
    /* 经纬度不能不写，不然就定位到海里去了 */
    longitude: 121.00,
    latitude: 28.00,  // 默认为空，用户授权之后拿取地理位置，如果用户拒绝授权？
    /* 后端获取用户当前位置周边所有的网点，然后重新渲染 */
    markers: [{
      iconPath: '/images/marker.png',
      id: 0,
      latitude: 28.51,
      longitude: 121.56,
      width: 50,
      height: 50
    }],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    /* 获取当前位置周围的所有网点 并渲染marker*/
    console.log("map onload")
    
    var this_ = this;
    wx.getLocation({
      type: "gcj02",
      altitude: true,
      success(res) {
        this_.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: this_.getLocationMarkers()
        });
        console.log(this_.data)
      },
      fail(err) {
        console.log(err)
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },

  getLocationMarkers() {
    let markers = [];
    for (let item of locationData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  createMarker(point) {
    let marker = {
      iconPath: "../../images/marker.png",
      id: point.id || 0,
      name: point.title || '',
      latitude: point.latitude,
      longitude: point.longitude,
      width: 25,
      height: 30
    };
    return marker;
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