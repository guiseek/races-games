import {IntervalCallback} from '../types'

export const timeout = (handler: TimerHandler, ms = 1000) => {
  const ref = setTimeout(handler, ms)
  return () => clearTimeout(ref)
}

export const interval = (handler: IntervalCallback, ms = 1000, inc = 0) => {
  const ref = setInterval(() => handler(inc++), ms)
  return () => clearInterval(ref)
}
