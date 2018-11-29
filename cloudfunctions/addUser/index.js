/**
 * 保存用户
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const openid = cloud.getWXContext().OPENID
  const exists = await db.collection('t_users').where({ openid }).count()
  if (exists.total > 0) return "已经存在"

  return db.collection('t_users').add({
    data: {
      openid,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      gender: event.gender,
      createtime: db.serverDate(),
      country: event.country,
      province: event.province,
      city: event.city
    }
  })
}