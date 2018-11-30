/**
 * 我加入过的活动  不包括我创建的
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const db = cloud.database()

  // 我创建或者加入的 返回类似 [_id1, _id2, ...]
  const data = await cloud.callFunction({
    name: 'myArticlesId',
    data: {
      openid: OPENID
    }
  })
  const articleids = data.result

  if (articleids.length > 0) {
    let joinIds
    // 我创建的 返回对象数组 [{_id1: _id, datetime: time}, ...]
    const create = await cloud.callFunction({
      name: 'myCreateArticles',
      data: {
        openid: OPENID
      }
    })
    if (create.result.length > 0) {
      let createIds = []
      create.result.forEach(c => {
        createIds.push(c._id)
      })
      joinIds = articleids.filter(a => createIds.indexOf(a) === -1)
    } else joinIds = articleids
    if (!joinIds || joinIds.length === 0)
      return []
      
    const joinArticles = await db.collection('t_articles').where({ _id: db.command.in(joinIds) }).field({ content: false }).orderBy('datetime', 'asc').get()
    return joinArticles.data
  }
  return []  
}