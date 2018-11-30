const app = getApp()
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
  },
  switchArticles(active) {
    switch(active) {
      case 'create':
        this.getArticles()
        break;
      case 'join':
        break;
      case 'ing':
        break;
      default:
        break;
    }
  },
  getArticles() {
    // 不分页 查所有
    wx.cloud.callFunction({
      name: 'listOfArticle',
      data: {
        offset: 0,
        limit: 100,
        openid: app.globalData.loginInfo.openid
      }
    }).then(res => console.log(result))
  }
})