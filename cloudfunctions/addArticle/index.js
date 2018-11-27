// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const { OPENID } = cloud.getWXContext() 
  return await db.collection('t_articles').add({
    data: {
      datetime: event.datetime,
      province: event.province,
      city: event.city,
      district: event.district,
      district_code: event.district_code,
      addr: event.addr,
      content: event.content,
      category: JSON.parse(event.category),
      peopleNumber: event.peopleNumber,
      openid: OPENID,
      nickName:event.nickName,
      gender: event.gender,
      avatarUrl: event.avatarUrl
    }
  })
}