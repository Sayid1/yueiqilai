/**
 * 根据ID查询活动
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const article = await db.collection('t_articles').doc(event.id).get()

  if (!article.fulled) { // 期望人数还没满
    const result = await db.collection('t_articles_users').where({ articleid: event.id }).count()
    article.data.num = result.total
  }
  return article.data
}