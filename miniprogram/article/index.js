import { addUser } from '../utils/util.js'
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
    if (!app.globalData.loginInfo) {
      wx.cloud.callFunction({
        name: 'login'
      }).then(({ result }) => app.globalData.loginInfo = result)
      .catch(() => {})
      .then(() => this.getArticle(options))
    } else this.getArticle(options)
  },
  /**
   * 加入
   */
  join({ detail }) { 
    if (detail.errMsg.includes('fail')) {
      this.showModal('尼玛同意请授权啊')
      return
    }
    const { userInfo } = detail
    addUser(userInfo)
    
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'joinArticle',
      data: {
        articleid: this.data.article._id,
        articlePeopleNumber: this.data.article.peopleNumber
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
    const article = this.data.article
    let data = { articleid: article._id }
    let content = '确认退出吗？可以再次加入'
    if (article.num === 1) {
      content = '团队人数只有一人，退出即解散该团'
      data.disband = true
    } else if (article.peopleNumber === 2) {
      content = '期望人数只有两人，退出即解散该团'
      data.disband = true
    }
    wx.showModal({
      title: '',
      content: content,
      showCancel: true,
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'outofArticle',
            data
          }).then(res => console.log(res))
          .catch(err => console.log(err))
        }
      }
    })
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
        title: result.category.name
      })
      let isMyArticle = app.globalData.loginInfo.openid === result.openid
      this.setData({
        article: result,
        isMyArticle
      })
      if (!isMyArticle) {
        return wx.cloud.callFunction({
          name: 'myArticlesId'
        })
      }
      
      }).then(res => {
        if (res && res.result.indexOf(this.data.article._id) > -1) {
          this.setData({
            isMyArticle: true
          })
        }
        
      }).catch(err => {
        console.error(err)
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