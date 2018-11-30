/**
 * 用户退出活动
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID || event.openid
  const db = cloud.database()
  const disband = event.disband // 是否解散活动
  const articleid = event.articleid

  if (disband) // 解散
    return await db.collection('t_articles').doc(articleid).update({ data: { disband: true }})
  
  // 删除用户加入记录
  return await db.collection('t_articles_users').where({ articleid, openid }).remove()
}