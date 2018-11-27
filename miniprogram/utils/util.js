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