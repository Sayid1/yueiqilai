const app = getApp()
import { throttle } from '../../utils/util.js'
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    articles: [],
    offset: 0,
    limit: 6,
    scrollHeight: '',
    disableLoadMore: false
  },
  onLoad() {
    this.setData({ scrollHeight: app.globalData.systemInfo.windowHeight + 50})
  },
  onShow() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getArticles()
    .catch(err => console.log(err))
    .then(() => wx.hideLoading())
  },
  loadMoreArticles() {
    throttle(function() {
      if (!this.data.disableLoadMore) {
        wx.showLoading({
          title: '加载中',
        })
        this.getArticles()
        .catch(err => console.log(err))
        .then(() => wx.hideLoading())
      }
    }, 500).bind(this)()
    
  },
  getArticles() {
    const { offset , limit } = this.data
    return wx.cloud.callFunction({
      name: 'listOfArticle',
      data: {
        offset,
        limit
      }
    }).then(({ result }) => {
      result.list.forEach(item => item.date = item.datetime.split(' ')[0])
  
      const data = {
        articles: this.data.articles.concat(result.list),
        offset: offset + limit
      }
      if (result.count === offset + result.list.length) {
        console.log('到底了')
        data.disableLoadMore = true
      }
      this.setData(data)
    })
  },
  toArticle({ target }) {
    wx.navigateTo({
      url: `/article/index?id=${target.dataset.id}`,
    })
  },
  onReady() {
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