// miniprogram/pages/profile/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    params.form = 'share'
    let query = ''
    Object.keys(params).forEach(key => query += key + '=' + params[key] + '&')
    return {
      title: this.data.article.category.name,
      path: '/' + this.route + '?' + query.slice(0, -1)
    }
  }
})