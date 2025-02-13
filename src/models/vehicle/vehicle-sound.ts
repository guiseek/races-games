import {Audio} from 'three'

export class VehicleSound {
  constructor(private engine: Audio) {
    this.engine.setLoop(true)
    this.engine.setVolume(0)
    this.engine.play()
  }

  update(rpm: number) {
    const pitch = 1 + rpm / 6000

    this.engine.setPlaybackRate(pitch)

    const volume = 0.5 + (rpm / 6000) * 0.5

    this.engine.setVolume(volume)
  }
}
