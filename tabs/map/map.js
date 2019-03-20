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
        longitude: 121.53,
        latitude: 29.83,  // 默认为北京，用户授权之后拿取地理位置，如果用户拒绝授权？
        /* 后端获取用户当前位置周边所有的网点，然后重新渲染 */
        markers: locationData,
        scale: 10,
        locationAuthorized: true,
        showPopup: false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

        /* 不跳出授权弹框 默认显示宁波地区，点了markers才显示请求授权 */
        let this_ = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.record']) this_.authorizeLocation();
            }
        });
        /* 获取当前位置周围的所有网点 并渲染marker*/
        // var this_ = this;
        // wx.getSetting({
        //     success(res) {
        //         if (!res.authSetting['scope.record']) {
        //             /* 提前弹窗询问是否允许授权，并不是真实的发起授权 */
        //             wx.authorize({
        //                 scope: 'scope.userLocation',
        //                 success() {
        //                     this_.authorizeLocation();
        //                 },
        //                 fail() {
        //                     /* authorize的预先提起授权，一旦被拒绝，getLocation接口直接就failed掉了 只能直接opensetting了 */
        //                     wx.showModal({
        //                         title: '提示',
        //                         content: '先打开定位 才能使用该功能喔!',
        //                         confirmText: '确定',
        //                         cancelText: '取消',
        //                         success(res) {
        //                             if (res.confirm) {
        //                                 /* getLocation接口因为authorize fail而失效
        //                                  * 只能通过openSetting来再次拉起 */
        //                                 this_.getOpenSetting();
        //                             } else if (res.cancel) {
        //                                 /* 真实的拒绝了，之后使用首页的button去再次拉起openSetting */
        //                                 this_.setData({
        //                                     longitude: 121.53,
        //                                     latitude: 29.83,
        //                                     locationAuthorized: false
        //                                 });
        //                             }
        //                         }
        //                     });
        //                 }
        //             })
        //         } else {
        //             this_.authorizeLocation();
        //         }
        //     }
        //
        // })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady(e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    }
    ,
    controlMask() {
        console.log("control")
        this.setData({
            showPopup: !this.data.showPopup
        });
    },

    getLocationMarkers() {
        let markers = [];
        for (let item of locationData) {
            let marker = this.createMarker(item);
            markers.push(marker)
        }
        return markers;
    }
    ,

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
    }
    ,

    markertap(data) {
        let this_ = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    /* 提前弹窗询问是否允许授权，并不是真实的发起授权 */
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            this_.authorizeLocation();
                        },
                        fail() {
                            /* authorize的预先提起授权，一旦被拒绝，getLocation接口直接就failed掉了 只能直接opensetting了 */
                            wx.showModal({
                                title: '提示',
                                content: '先打开定位 才能使用该功能喔!',
                                confirmText: '确定',
                                cancelText: '取消',
                                success(res) {
                                    if (res.confirm) {
                                        /* getLocation接口因为authorize fail而失效
                                         * 只能通过openSetting来再次拉起 */
                                        this_.getOpenSetting();
                                    } else if (res.cancel) {
                                        /* 真实的拒绝了，之后使用首页的button去再次拉起openSetting */
                                        this_.setData({
                                            longitude: 121.53,
                                            latitude: 29.83,
                                            locationAuthorized: false
                                        });
                                    }
                                }
                            });
                        }
                    })
                } else {
                    this_.authorizeLocation();
                }
            }

        })
    },

    authorizeLocation() {
        let this_ = this;
        wx.getLocation({
            type: "gcj02",
            altitude: true,
            success(res) {
                /* 让用户当前的位置成为地图的center经纬度 */
                console.log(res.longitude + "   " + res.latitude)
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
        })
    },

    /* 用户拒绝授权之后，自己手动获取权限 opensetting */
    getOpenSetting() {
        let this_ = this;
        wx.openSetting({
            success(res) {
                /* 这里还需要判断一下用户是推绿了还是无作为 */
                let locationState = res.authSetting["scope.userLocation"];
                let userinfoState = res.authSetting["scope.userInfo"];
                if (locationState) {
                    /* 手动更改authSetting 这样可以不需要弹窗了 */
                    res.authSetting = {
                        "scope.userLocation": true
                    }
                    this_.authorizeLocation();
                } else {
                    this_.setData({
                        longitude: 121.53,
                        latitude: 29.83,
                        locationAuthorized: false
                    });
                }
            },
            fail() {
                console.log("打开手机setting的接口failed")
            }
        })
    },

    getUserInfo() {
        console.log("获取用户信息")
    },
    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage:
        function () {

        }
})