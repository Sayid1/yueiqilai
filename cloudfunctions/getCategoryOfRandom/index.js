/**
 * 随机获取6个类型  然后去掉里面的重复的
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const c1 = await db.collection('t_category').skip(Math.floor(Math.random() * 10)).limit(2).get()
  const c2 = await db.collection('t_category').skip(Math.floor(Math.random() * 10)).limit(2).get()
  const c3 = await db.collection('t_category').skip(Math.floor(Math.random() * 10)).limit(2).get()
  return Array.from(new Set(c1.data.concat(c2.data, c3.data))) 
}