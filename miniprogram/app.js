App({
  onLaunch(options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以sadasdasdsa上的基础库以使用云能力')
      return
    }
    wx.cloud.init({
      traceUser: true,
    })

    // 如果是通过群聊转发进来的  记录转发票据
    if (options.shareTicket) {
      wx.cloud.callFunction({
        name: 'addShareTicket',
        data: {
          shareTicket: options.shareTicket
        }
      })
    } else if (options.query && options.query.form !== '') { // 单聊分享
      wx.cloud.callFunction({
        name: 'addShareTicket',
        data: {
          shareTicket: options.query.form
        }
      })
    }
    wx.cloud.callFunction({
      name: 'login'
    }).then(({ result }) => this.globalData.loginInfo = result)

    var systemInfo = wx.getSystemInfoSync()
    this.globalData = { systemInfo }
  },
  onShow() {
    wx.cloud.callFunction({ name: 'myNotices' }).then(({ result }) => result && wx.setStorageSync('key', result))
  }
})
