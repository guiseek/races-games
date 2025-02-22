import {Audio} from 'three'

export class VehicleSound {
  constructor(readonly audio: Audio) {
    this.audio.setLoop(true)
    this.audio.setVolume(0)
  }

  update(rpm: number) {
    const pitch = 1 + rpm / 6000

    this.audio.setPlaybackRate(pitch)

    const volume = 0.5 + (rpm / 6000) * 0.5

    this.audio.setVolume(volume)
  }
}
