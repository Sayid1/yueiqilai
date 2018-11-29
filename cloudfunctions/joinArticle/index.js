/**
 * 加入活动
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  let openid = event.openid
  if (!openid) openid = cloud.getWXContext().OPENID

  // 保存用户加入记录
  await db.collection('t_articles_users').add({
    data: {
      openid,
      articleid: event.articleid
    }
  })
   // 查询该活动所有已加入用户的openid  不包括当前加入的
  const r = await db.collection('t_articles_users').where({ articleid: event.articleid, openid: db.command.neq(openid) }).field({ openid: true, _id: false }).get()
  const data = r.data
  let openids = []
  data.forEach(au => openids.push(au.openid))

  const noticesConnection = db.collection('t_notices')
  let result
  try {
      // 更新通知 为当前用户加入之前的用户都增加一条通知
    result = await noticesConnection.where({ articleid: event.articleid }).update({ openids })
  } catch (err) {
      // 创建通知 为当前用户加入之前的用户都增加一条通知
    result = await noticesConnection.add({
        data: {
          articleid: event.articleid,
          openids: openids.join(',')
        }
      })
  }
  return result
 
}