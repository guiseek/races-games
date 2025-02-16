import {Callback} from '../core'

export const events = <K extends keyof WindowEventMap>(
  callback: Callback<WindowEventMap[K]>,
  ...events: K[]
) => {
  events.forEach((event) => addEventListener(event, callback))

  return () => events.forEach((event) => removeEventListener(event, callback))
}
