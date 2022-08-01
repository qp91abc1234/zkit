/**
 * 防抖函数：delay 时候后执行一次
 */
export function debounce(
  func: Function,
  delay: number,
  immediate: boolean = false
) {
  let timer: any
  function ret(this: any, ...args: any) {
    if (immediate) {
      func.apply(this, args)
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
  return ret
}

/*
 * 节流函数：wait 时间内只能走一次
 */
export function throttle(func: Function, wait: number) {
  let timer: any
  function ret(this: any, ...args) {
    if (!timer) {
      func.apply(this, args)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
  return ret
}
