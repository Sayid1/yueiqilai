var area = require('../../utils/area.js').default,
  QQMapWX  = require('../../utils/qqmap-wx-jssdk.min.js'),
  db = wx.cloud.database({
    env: 'yueqilai'
  }),
  app = getApp(),
  qqmapsdk
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    showArea: false,
    showDatetime: false,
    province: '',
    city: '',
    district: '',
    datetime: '',
    category: '',
    adcode: '',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  addCategory() {
    wx.navigateTo({
      url: '/pages/category/index',
    })
  },
  /**
   * 显示选择时间
   */
  showDatetime() {
    this.setData({
      showDatetime: true,
    })
  },
  /**
   * 隐藏选择时间
   */
  hideDatetime() {
    this.setData({
      showDatetime: false,
    })
  },
  /**
   * 选择时间 确定
   */
  chooseDatetime({ detail }) {
    var datetime = new Date(detail)
    this.setData({
      datetime: this.getDatetime(datetime),
      showDatetime: false
    })
  },
  /**
   * 显示选择地点
   */
  showArea() {
    this.setData({
      showArea: true,
    })
  },
  /**
   * 隐藏选择地点
   */
  hideArea() {
    this.setData({
      showArea: false
    })
  },
  /**
   * 选择地点 确定
   */
  chooseArea({ detail }) {
    var addr = detail.detail
    this.setData({
      province: addr.province,
      city: addr.city,
      district: addr.county,
      showArea: false
    })
  },
  getDatetime(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1 + '').padStart(2, 0) + '-' + (date.getDate() + '').padStart(2, 0) + ' ' + (date.getHours() + '').padStart(2, 0) + ':' + (date.getMinutes() + '').padStart(2, 0) + ':' + (date.getSeconds() + '').padStart(2, 0)
  },
  getLocation() {
    var self = this
    wx.getLocation({
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(res) {
            var addr = res.result.address_component
            self.setData({
              province: addr.province,
              city: addr.city,
              district: addr.district,
              adcode: res.result.ad_info.adcode
            })
          }
        })
      },fail(err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(2)
    this.setData({
      areaList: area
    })
    qqmapsdk = new QQMapWX({
      key: 'K7IBZ-NWD3S-PTEOQ-6A2UZ-QXYCJ-5KFAV'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.app = getApp()
    var self = this
    this.setData({
      datetime: this.getDatetime(new Date())
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              self.getLocation()
            },fail() {
              wx.openSetting()
            }
          })
        } else {
          self.getLocation()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const category = app.globalData.category
    if (category) {
      this.setData({ category })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})