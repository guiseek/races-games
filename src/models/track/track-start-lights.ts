import {ObjectStartLights} from '../../interfaces'
import {async, interval} from '../../utils'
import {TrackSound} from './track-sound'

export class TrackStartLights {
  constructor(public object: ObjectStartLights, private sound: TrackSound) {
    for (const child of object.children) {
      child.material.opacity = 0.2
    }
  }

  start() {
    return async<void>((resolve) => {
      const dispose = interval((n) => {
        if (n <= 2) {
          this.object.children[n].material.opacity = 1
          this.sound.blinkStartLight()
        } else {
          this.turnOffAllLeds()
          resolve(dispose())
        }
      })
    })
  }

  turnOffAllLeds() {
    for (const child of this.object.children) {
      child.material.opacity = 0
    }
  }
}
