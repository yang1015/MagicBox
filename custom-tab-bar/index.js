Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/tabs/map/map",
      // iconPath: "/image/icon_component.png",
      // selectedIconPath: "/image/icon_component_HL.png",
      text: "组件"
    }, {
      pagePath: "/tabs/scan/scan",
      // iconPath: "/image/icon_API.png",
      // selectedIconPath: "/image/icon_API_HL.png",
      text: "接口"
    },
      {
        pagePath: "/tabs/user/user",
        // iconPath: "/image/icon_API.png",
        // selectedIconPath: "/image/icon_API_HL.png",
        text: "接口"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      if (data.index === 1) {
        console.log("调用scan");

        wx.scanCode({
          success(res) {
            console.log(res)
            var code = 1;
            wx.navigateTo({
              url: '/pages/carStatus/carStatus?id=' + code,  /*这里要使用绝对路径，相对路径会找不到 */
            })
          }
        })
      }
      this.setData({
        selected: data.index
      })
    }
  }
})