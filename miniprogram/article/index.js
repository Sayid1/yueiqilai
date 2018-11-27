const app = getApp()
let params 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    isMyArticle: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    params = options || {}
    if (!app.globalData.userInfo) {
      wx.cloud.callFunction({
        name: 'login'
      }).then(({ result }) => app.globalData.userInfo = result)
      .catch(() => {})
        .then(() => this.getArticle(options))
    } else this.getArticle(options)
  },
  getArticle(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getArticle',
      data: {
        id: options.id
      }
    }).then(({ result }) => {

      wx.setNavigationBarTitle({
        title: result.data.category.name
      })
      this.setData({
        article: result.data,
        isMyArticle: app.globalData.userInfo.openid === result.data.openid
      })
    }).catch(err => {
      wx.showModal({
        title: '',
        content: '出错了',
        showCancel: false,
        confirmColor: '#0079f3'
      })
    }).then(() => wx.hideLoading())
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