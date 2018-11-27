
const callFunction = wx.cloud.callFunction
let value = '' // 输入框的值
Page({
  chooseCategory(event) {
    this.app.globalData.category = {
      id: event.currentTarget.dataset.id,
      name: event.currentTarget.dataset.name
    }
    wx.navigateBack()
  },
  input({ detail }) {
    value = detail.value
    if (!value) this.setData({list: []})
  },
  search() {
    if (!value) return
    callFunction({
      name: 'getCategory',
      data: {
        name: value
      }
    }).then(({ result }) => this.setData({list: result.data}))
  },
  /**
   * 页面的初始数据
   */
  data: {
    catetory: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    callFunction({
      name: 'getCategoryOfRandom'
    }).then(({ result }) => this.setData({ catetory: result }))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.app = getApp()
  }
})