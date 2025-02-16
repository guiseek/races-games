import {MCLAREN_MP4_4, MCLAREN_MP4_5, RB20, RB9, WROTH} from './vehicles'
import {INTERLAGOS, SPA} from './tracks'
import {TrackConfig, VehicleConfig} from '../interfaces'

export * from './tracks'
export * from './vehicles'

export const vehicles = [RB20, RB9, MCLAREN_MP4_5, MCLAREN_MP4_4, WROTH].reduce(
  (prev, curr) => {
    prev[curr.model] = curr
    return prev
  },
  {} as Record<string, VehicleConfig>
)

export const tracks = [SPA, INTERLAGOS].reduce((prev, curr) => {
  prev[curr.model] = curr
  return prev
}, {} as Record<string, TrackConfig>)
