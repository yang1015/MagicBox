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
    longitude: 116.23,
    latitude: 39.54,  // 默认为北京，用户授权之后拿取地理位置，如果用户拒绝授权？
    /* 后端获取用户当前位置周边所有的网点，然后重新渲染 */
    markers: [{
      iconPath: '/images/marker.png',
      id: 0,
      longitude: 116.23,
      latitude: 39.54,
      width: 50,
      height: 50
    }],
    scale: 8,
    locationAuthorized: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    /* 获取当前位置周围的所有网点 并渲染marker*/
    var this_ = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          console.log("用户之前拒绝授权了");
          /* 如果定位授权被拒绝 */
          wx.showModal({
            title: '提示',
            content: '对不起，请打开定位权限才能使用该功能!',
            confirmText: '允许授权',
            cancelText: '拒绝授权',
            success(res) {
              if (res.confirm) {
                /* 用户允许发起授权，再次弹窗 */
                this_.authorizeLocation();
              } else if (res.cancel) {
                console.log('用户点击取消');
                // 给wxml添加一个获取授权的icon
                // 直接定位到beijing centered
                this_.setData({
                  longitude: 116.23,
                  latitude: 39.54,
                  locationAuthorized: false
                });
              }
            }
          })
        } else {
          console.log("用户location授权了并定位");
          this_.authorizeLocation();
        }
      }
    })
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

  authorizeLocation() {
    let this_ = this;
    wx.getLocation({
      type: "gcj02",
      altitude: true,
      success(res) {
        /* 让用户当前的位置成为地图的center经纬度 */
        console.log(res.longitude + " " + res.latitude)
        this_.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: this_.getLocationMarkers(),
          scale: 14,
          locationAuthorized: true
        });
      },
      fail(err) {
        console.log(err)
      }
    });
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})