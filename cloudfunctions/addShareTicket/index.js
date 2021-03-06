/**
 * 保存来自分享的票据
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  return db.collection('t_share_tickets').add({
    data: {
      "ticket": event.shareTicket
    }
  })
}