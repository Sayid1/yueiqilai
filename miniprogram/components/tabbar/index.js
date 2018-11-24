// tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: Number,
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    currentActive: -1
  },
  /**
   * 生命周期事件
   */
  created() {
    this.setData({ currentActive: this.data.active });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      wx.navigateTo({url: '/pages/add/index'})
    }
  }
})
