const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: false
  },
  toMyArticles({ target }) {
    wx.navigateTo({
      url: '/myArticles/index?active=' + target.dataset.active,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo
  },
  onShow() {
    wx.getStorage({
      key: 'key',
      success: res => {
        if (res.data.length > 0)
          this.setData({ notice: true })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})