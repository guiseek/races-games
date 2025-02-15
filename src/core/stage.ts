import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Updatable} from '../interfaces'
import {Follower} from './follower'
import {Renderer} from './renderer'
import {Player} from '../player'
import {World} from 'cannon-es'
import {Camera} from './camera'
import {
  Clock,
  Scene,
  TextureLoader,
  EquirectangularReflectionMapping,
  PointLight,
  DirectionalLight,
  HemisphereLight,
  SpotLight,
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

  controls: Follower

  constructor(
    container: HTMLElement,
    textureLoader: TextureLoader,
    private player: Player
  ) {
    this.world.gravity.set(0, -13.81, 0)
    this.world.defaultContactMaterial.friction = 280
    this.world.defaultContactMaterial.restitution = 0

    this.renderer = new Renderer(container)

    this.controls = new Follower(this.camera)

    const pointLight = new PointLight(0xffffff, 1, 10)
    const dirLight = new DirectionalLight(0xffffff, 1)
    const hemiLight = new HemisphereLight(0xffffff, 1)
    const spotLight = new SpotLight(0xffffff, 1, 10, 1)
    this.scene.add(pointLight, dirLight, hemiLight, spotLight)

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

    if (this.player.actions.paused) return

    const delta = this.clock.getDelta()

    this.world.step(this.timeStep, delta)

    for (const updatable of this.#updatables) {
      updatable.update(delta)
    }

    if (this.controls.hasTarget) {
      this.controls.update()
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
