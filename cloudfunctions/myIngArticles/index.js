/**
 * 我正在进行的
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID || event.openid
  const db = cloud.database()

  // 我加入的活动id
  const data = await cloud.callFunction({
    name: 'myArticlesId',
    data: {
      openid,
    }
  })
  const myArticlesId = data.result
  if (myArticlesId.length < 1)
    return []

  const ingArticles = await db.collection('t_articles').where({ _id: db.command.in(myArticlesId), fulled: false, disband: false }).field({ content: false }).orderBy('datetime', 'asc').get()
  return ingArticles.data
}