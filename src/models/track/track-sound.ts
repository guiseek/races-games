import {Audio} from 'three'

export class TrackSound {
  constructor(private startLight: Audio) {}

  blinkStartLight() {
    this.startLight.play()
  }
}
