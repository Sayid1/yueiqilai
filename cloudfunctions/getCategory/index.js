/**
 * 根据name模糊查询类型
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  return await db.collection('t_category').where({
    name: db.RegExp({ 
      regexp: event.name,
      options: 'i'
    }) 
  }).get()
}