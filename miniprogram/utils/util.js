const BASE_URL = 'https://isayid.cn/wx/'

/**
 * 函数截流
 */
export function throttle(fn, delay) {
  let timer, last
  return function() {
    const now = new Date(),
          ctx = this
    if (last && now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout((() => fn.apply(ctx), delay))
    } else {
      last = now
      fn.apply(ctx)
    }
  }
}

/**
 * 保存用户
 */
export function addUser(user) {
  return wx.cloud.callFunction({
    name: 'addUser',
    data: user
  })
}

/**
 * 获取accessToken
 */

export function getAccessToken() {
  return new Promise((resolve, reject) => {
    return wx.request({
      url: BASE_URL + 'getWxAccessToken',
      success: res => resolve(res.data),
      fail: err => reject(err)
    })
  })
}
/**
 * 
 */
export function msgSecCheck(content) {
  return new Promise((resolve, reject) => {
    return wx.request({
      url: BASE_URL + 'msgSecCheck',
      method: 'POST',
      data: {
        content,
      },
      success: res => resolve(res.data),
      fail: err => reject(err)
    })
  })
}