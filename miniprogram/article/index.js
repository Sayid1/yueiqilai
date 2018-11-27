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
  /**
   * 
   */
  join() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'joinArticle',
      data: {
        articleid: this.data.article._id
      }
    }).then(res => {
      this.setData({
        isMyArticle: true
      })
      wx.showToast({
        title: '加入成功',
      })
    }).catch(err => {
      wx.showModal({
        title: '',
        content: '遇到了错误，请重试',
      })
    }).then(() => wx.hideLoading())
  },
  /**
   * 退出
   */
  outof() {
    if (this.data.article.peopleNumber === 2) {
      wx.showModal({
        title: '',
        content: '因人数只有两人，你退出即解散改团',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '',
        content: '确认退出吗？可以再次加入',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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
      let isMyArticle = app.globalData.userInfo.openid === result.data.openid
      this.setData({
        article: result.data,
        isMyArticle
      })
      if (!isMyArticle) {
        return wx.cloud.callFunction({
          name: 'myArticlesId'
        })
      }
      
      }).then(res => {
        if (res && res.data && res.data.indexOf(app.globalData.userInfo.openid) > -1) {
          isMyArticle = true
          this.setData({
            isMyArticle
          })
        }
        
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
  onShareAppMessage: function (options) {
    params.form = 'share'
    if (options.from === 'button') params.form = 'btnshare'
    let query = ''
    Object.keys(params).forEach(key => query += key + '=' + params[key] + '&')
    return {
      title: this.data.article.category.name,
      path: '/' + this.route + '?' + query.slice(0, -1)
    }
  }
})