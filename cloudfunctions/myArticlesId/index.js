// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const { OPENID } = cloud.getWXContext() 

  return await db.collection('t_articles_users').where({ openid: OPENID }).field({ articleid: true, _id: false }).get()
}