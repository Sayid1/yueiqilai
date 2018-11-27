// tabbar.js
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
  /**
   * 组件的方法列表
   */
  methods: {
    toAdd() {
      wx.navigateTo({ url: '/add/index'})
    },
    toProfile() {
      wx.navigateTo({ url: '/profile/index'})
    },
    toIndex() {
      wx.navigateTo({ url: '/pages/index/index' })
    }
  }
})
