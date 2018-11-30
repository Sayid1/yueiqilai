/**
 * 返回我创建或加入的所有活动id
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const openid = cloud.getWXContext().OPENID || event.openid

  const articleids = await db.collection('t_articles_users').where({ openid }).field({ articleid: true, _id: false }).get()
  const data = articleids.data
  let r = []
  if (data) {
    data.forEach(a => r.push(a.articleid))
  }
  return r
}