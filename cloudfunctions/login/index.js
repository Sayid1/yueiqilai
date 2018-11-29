/**
 * 登录 返回openid
 */


const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    unionid: wxContext.UNIONID,
  }
}
