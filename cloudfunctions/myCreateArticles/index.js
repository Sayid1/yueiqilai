/**
 * 所有我创建的活动
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const openid = cloud.getWXContext().OPENID || event.openid

  const articles = await db.collection('t_articles').field({ content: false }).orderBy('datetime', 'asc').get()

  return articles.data
}