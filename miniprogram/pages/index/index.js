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
    animation: null
  },
  onReady() {
    this.animation = wx.createAnimation()
    this.query = wx.createSelectorQuery()
    wx.getSystemInfoSync()
    this.app = getApp()
    // this.animation.scale(0).step()
    // this.setData({ animation: this.animation.export() })
  },
  showDetail() {
    // var self = this
    // wx.createSelectorQuery().select('#viewer').boundingClientRect(function(res) {
    //   var w = res.width/2,
    //       h = res.height/2,
    //       vw = self.app.globalData.windowWidth/2,
    //       vh = self.app.globalData.windowHeight/2
    //       console.log(self.app.globalData)
    //   self.animation.scale(0).top(vh).left(vw).translate(-w, -h).scale(1).step()
    //   self.setData({ animation: self.animation.export() })
    // }).exec()
  }
})