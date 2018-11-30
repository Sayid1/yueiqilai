const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: '',
    created: [],
    join: [],
    ing: []
  },
  changeSwiper({ target }) {
    if (this.data.active !== target.dataset.active)
      this.switchArticles(target.dataset.active)
  },
  changeTabs({ detail }) {
    this.switchArticles(detail.currentItemId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.switchArticles(options.active)
  },
  switchArticles(active) {
    this.setData({
      active,
    })
    switch(active) {
      case 'created':
        this.myCreateArticles()
        break;
      case 'join':
        this.myJoinArticles()
        break;
      case 'ing':
        this.myIngArticles()
        break;
      default:
        break;
    }
  },
  myIngArticles() {
    if (this.data.ing.length) return
    wx.cloud.callFunction({
      name: 'myIngArticles'
    }).then(({ result }) => {
      this.setData({ ing: result })
    })
  },
  myJoinArticles() {
    if (this.data.join.length) return
    wx.cloud.callFunction({
      name: 'myJoinArticles'
    }).then(({ result }) => {
      console.log(result)
      this.setData({ join: result })
    })
  },
  myCreateArticles() {
    if (this.data.created.length) return
    wx.cloud.callFunction({
      name: 'myCreateArticles',
      data: {
        openid: app.globalData.loginInfo.openid
      }
    }).then(({ result }) => {
      console.log(result)
      this.setData({ created: result })
    })
  }
})