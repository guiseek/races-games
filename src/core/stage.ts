import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Updatable} from '../interfaces'
import {Renderer} from './renderer'
import {World} from 'cannon-es'
import {Camera} from './camera'
import {
  Clock,
  Scene,
  TextureLoader,
  EquirectangularReflectionMapping,
} from 'three'

export class Stage {
  world = new World()

  scene = new Scene()

  clock = new Clock()

  camera = new Camera()

  renderer: Renderer

  timeStep = 1 / 60

  #updatables = new Set<Updatable>()

  stats = new Stats()

  constructor(container: HTMLElement, textureLoader: TextureLoader) {
    this.world.gravity.set(0, -9.81, 0)
    this.world.defaultContactMaterial.friction = 80

    this.renderer = new Renderer(container)

    textureLoader
      .loadAsync('wasteland_clouds_puresky_4k.jpeg')
      .then((texture) => {
        texture.mapping = EquirectangularReflectionMapping
        texture.needsUpdate = true
        this.scene.background = texture
        this.scene.environment = texture
      })

    container.appendChild(this.stats.dom)

    addEventListener('resize', this.onResize)
  }

  addUpdatable(entity: Updatable) {
    this.#updatables.add(entity)
  }

  removeUpdatable(updatable: Updatable) {
    this.#updatables.delete(updatable)
  }

  animate = () => {
    this.stats.begin()

    requestAnimationFrame(this.animate)

    const delta = this.clock.getDelta()

    this.world.step(this.timeStep, delta, 30)

    for (const updatable of this.#updatables) {
      updatable.update(delta)
    }

    this.renderer.render(this.scene, this.camera)

    this.stats.end()
  }

  onResize = () => {
    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(innerWidth, innerHeight)
  }
}
