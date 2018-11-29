Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: ''
  },
  changeSwiper({ target }) {
    if (this.data.active !== target.dataset.active)
      this.setData({
        active: target.dataset.active
      })
  },
  changeTabs({ detail }) {
    this.setData({
      active: detail.currentItemId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      active: options.active
    })
  }
})