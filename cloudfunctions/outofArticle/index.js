/**
 * 用户退出活动
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID || event.openid
  const disband = event.disband // 是否解散活动
  const articleid = event.articleid
  const db = cloud.database()

  if (disband) // 解散
    return await db.collection('t_articles').doc(articleid).update({ disband: true})
  
  // 删除用户加入记录
  return await db.collection('t_articles_users').where({ articleid, openid }).remove()
}