/**
 * 查询加入该活动的所有opoenid
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  

  const openids = await db.collection('t_articles_users').where({ articleid: event.articleid }).field({openid: true, _id: false}).get()
  const data = openids.data
  let r = []
  if (data) {
    data.forEach(a => r.push(a.openid))
  }
  return r
}