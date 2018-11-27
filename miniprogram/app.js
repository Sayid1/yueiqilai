//app.js
App({
  onLaunch: function (options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以sadasdasdsa上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })

      // 如果是通过转发进来的  记录转发票据
      if (options.shareTicket) {
        wx.cloud.callFunction({
          name: 'addShareTicket',
          data: {
            shareTicket: options.shareTicket
          }
        })
      }
    }
    var systemInfo = wx.getSystemInfoSync()
    this.globalData = { systemInfo }
  }
})
