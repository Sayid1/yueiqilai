// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const list = await db.collection('t_articles').skip(event.offset).limit(event.limit).get()
  const count = await db.collection('t_articles').count()
  return { list: list.data, count: count.total }
}