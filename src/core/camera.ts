import {PerspectiveCamera} from 'three'

export class Camera extends PerspectiveCamera {
  static get aspect() {
    return innerWidth / innerHeight
  }

  constructor(fov = 45, near = 0.1, far = 20000) {
    super(fov, Camera.aspect, near, far)
  }

  resize() {
    this.aspect = Camera.aspect
    this.updateProjectionMatrix()
  }
}
