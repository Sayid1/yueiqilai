/**
 * 获取通知 （有新用户加入我参与的活动）
 * return 活动id列表
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const r = await db.collection('t_notices').where({
    openids: db.RegExp({
      regexp: cloud.getWXContext().OPENID,
      options: 'i',
    })
  }).field({ articleid: true, _id: false }).get()
  const data = r.data

  let articleids = []
  data.forEach(au => articleids.push(au.articleid))
  return articleids
}