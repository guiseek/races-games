import {ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer} from 'three'

export class Renderer extends WebGLRenderer {
  constructor(container: HTMLElement) {
    super({antialias: true})

    this.setClearColor(0x010101)
    this.setPixelRatio(devicePixelRatio)
    this.setSize(innerWidth, innerHeight)

    this.shadowMap.enabled = true
    this.shadowMap.type = PCFSoftShadowMap
    this.toneMapping = ACESFilmicToneMapping
    this.toneMappingExposure = 1.5

    container.appendChild(this.domElement)
  }

  resize() {
    this.setSize(innerWidth, innerHeight)
  }
}
