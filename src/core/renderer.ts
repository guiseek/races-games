import {PCFSoftShadowMap, WebGLRenderer} from 'three'

export class Renderer extends WebGLRenderer {
  constructor(container: HTMLElement) {
    super({antialias: true})

    this.setClearColor(0x010101)
    this.setPixelRatio(devicePixelRatio)
    this.setSize(innerWidth, innerHeight)
    
    this.shadowMap.type = PCFSoftShadowMap
    this.shadowMap.enabled = true

    container.appendChild(this.domElement)
  }
}
