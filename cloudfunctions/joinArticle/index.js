/**
 * 加入活动
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const openid = cloud.getWXContext().OPENID || event.openid
  const articleid = event.articleid
  const articlePeopleNumber = event.articlePeopleNumber // 活动期望人数

  // 将用户加入记录
  await db.collection('t_articles_users').add({
    data: {
      openid,
      articleid
    }
  })
   // 查询该活动所有已加入用户的openid  不包括当前加入的
  const r = await db.collection('t_articles_users').where({ articleid, openid: db.command.neq(openid) }).field({ openid: true, _id: false }).get()
  const data = r.data
  let openids = []
  data.forEach(au => openids.push(au.openid))

  // 更新活动人数已满
  if ((data.length + 1) === articlePeopleNumber) {
    db.collection('t_articles').doc(articleid).update({
      data: {
        fulled: true
      }
    })
  }

  const noticesConnection = db.collection('t_notices')
  let result
  try {
      // 更新通知 为当前用户加入之前的用户都增加一条通知
    result = await noticesConnection.where({ articleid }).update({ openids })
  } catch (err) {
      // 创建通知 为当前用户加入之前的用户都增加一条通知
    result = await noticesConnection.add({
        data: {
          articleid,
          openids: openids.join(',')
        }
      })
  }
  return result
 
}