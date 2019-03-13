Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#7A7E83",
    list: [
      {
      pagePath: "/tabs/map/map",
      text: "网点"
    }, 
    {
      pagePath: "/tabs/scan/scan",
      text: "扫码洗车"
    },
      {
        pagePath: "/tabs/user/user",
        text: "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path;
      console.log("跳转：")
      console.log(url);
     
      // if (data.index === 0) {
      //   // getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

      //   let pages = getCurrentPages();
      //   let currentPageRoute = pages[pages.length - 1].route;//最后一个
      //   if (currentPageRoute == "tabs/map/map") {
      //     wx.navigateTo({
      //       url: '/pages/network/network'
      //       // url: '../../pages/network/network', //这个路径是基于tab的 先跳出custom再跳出tab才进入pages
      //     });
      //   } else {
      //     wx.switchTab({url: '/tabs/map/map'});
      //   }
      // }

      // if (data.index === 1) {
      //   wx.scanCode({
      //     success(res) {
      //       var code = 1;
      //       wx.navigateTo({url: '/pages/carStatus/carStatus?id=' + code})
      //       /*这里要使用绝对路径，相对路径会找不到 */
      //     }
      //   });
      // } 


      // if (data.index === 2) wx.switchTab({ url })

      wx.switchTab({ url })

      this.setData({
        selected: data.index
      })
    }
  }
})

/* 切换tab到网点的时候 需要判断当前路由位置
如果在map，那么跳转network
如果不在，切换到tab map下 */