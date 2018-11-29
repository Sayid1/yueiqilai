const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Number,
      value: 1
    },
  },
  data: {
    dot: false
  },
  lifetimes: {
    attached() {
      wx.getStorage({
        key: 'key',
        success: res => {
          console.log(res.data.length > 0)
          console.log(res.data)
          if (res.data.length > 0)
            this.setData({ dot: true })
        }
      })
    },
  },
  attached() {
    wx.getStorage({
      key: 'key',
      success: res => {
        if (res.data.length > 0)
          this.setData({ dot: true })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toAdd() {
      wx.navigateTo({ url: '/add/index'})
    },
    toProfile() {
      wx.navigateTo({ url: '/profile/index' })
    },
    toIndex() {
      wx.navigateTo({ url: '/pages/index/index' })
    }
  }
})
