import Dialog from 'vant-weapp/dialog/dialog'
import { addUser, getAccessToken, msgSecCheck } from '../utils/util.js'
const regeneratorRuntime = require('../utils/runtime.js')

var area = require('../utils/area.js').default,
  QQMapWX  = require('../utils/qqmap-wx-jssdk.min.js'),
  db = wx.cloud.database({
    env: 'yueqilai'
  }),
  app = getApp(),
  qqmapsdk,
  content = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    showArea: false, // 显示省市区
    showAddr: false, // 显示详细地址
    showDatetime: false,
    showPeopleNumber: false,
    province: '',
    city: '',
    district: '',
    addr: '',
    peopleNumber: '',
    datetime: '',
    category: '',
    adcode: '',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  /**
   * 输入内容
   */
  inputContent({ detail }) {
    content = detail.value
  },
  toggleModal(event) {
    const key = event.currentTarget.dataset.key
    this.setData({
      [key]: !this.data[key]
    })
  },
  addCategory() {
    wx.navigateTo({
      url: '/category/index',
    })
  },

  /**
   * 输入详细地址
   */
  inputAddr({ detail }) {
    const addr = detail.value.trim()
    this.setData({ addr })
  },
  /**
   * 确认详细地址
   */
  comfirmAddr() {
    if (this.data.addr) {
      this.setData({
        showAddr: false,
      })
      return
    }
    this.showModal('尼玛输入详细地址啊')
  },
  /**
   * 输入几人
   */
  inputPeopleNumber({ detail }) {
    const peopleNumber = detail.value
    this.setData({ peopleNumber })
  },
  /*
   * 确认几人
   */
  comfirmPeopleNumber() {
    if (this.data.peopleNumber > 0) {
      this.setData({
        showPeopleNumber: false,
      })
      return
    }
    this.showModal('尼玛输入人数啊')
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
   * 选择地点 确定
   */
  chooseArea({ detail }) {
    var addr = detail.detail
    this.setData({
      province: addr.province,
      city: addr.city,
      district: addr.county,
      adcode: addr.code,
      showArea: false
    })
  },
  async onGotUserInfo({ detail }) {
    if (detail.errMsg.includes('fail')){
      this.showModal('尼玛同意请授权啊')
      return
    }
    if (content.trim()) {
      const check = await msgSecCheck(content)
      if (check.errcode === 87014) {
        return this.showModal('内容含有违法违规内容')
      }
    }
    const { userInfo } = detail
    addUser(userInfo)
    const { province, city, district, datetime, category, peopleNumber, addr, adcode } = this.data
    const params = [
      {'field': '约炮内容', 'value': content.trim()},
      {'field': '地点', 'value': province + '-' + city + '-' + district},
      {'field': '时间', 'value': datetime},
      {'field': '几人', 'value': peopleNumber},
      {'field': '分类', 'value': category},
      {'field': '详细地址', 'value': addr},
    ]
    const field = params.find(param => !param.value)
    if (field) {
      this.showModal('尼玛不输入' + field.field + ' ？？')
      return
    }
    
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'addArticle',
      data: { province, city, district, datetime, category: JSON.stringify(category), peopleNumber, content, addr, district_code: adcode,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender
      }
    })
      .then(({ result }) => wx.redirectTo({ url: `/article/index?id=${result._id}` }))
    .catch(err => {
      console.error(err)
    })
    .then(() => wx.hideLoading())

  },
  showModal(content) {
    wx.showModal({
      title: '',
      content,
      showCancel: false,
      confirmColor: '#0079f3'
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
  onLoad (options) {
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
})