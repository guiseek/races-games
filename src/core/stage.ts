import Stats from 'three/examples/jsm/libs/stats.module.js'
import {CameraOperator} from './camera-operator'
import {Updatable} from '../interfaces'
import {Renderer} from './renderer'
import {Player} from '../player'
import {World} from 'cannon-es'
import {
  Clock,
  Vector2,
  PointLight,
  DirectionalLight,
  EquirectangularReflectionMapping,
} from 'three'
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  RGBELoader,
  UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'

export class Stage {
  world = new World()

  clock = new Clock()

  timeStep = 1 / 60

  #updatables = new Set<Updatable>()

  stats = new Stats()

  constructor(
    container: HTMLElement,
    readonly renderer: Renderer,
    readonly operator: CameraOperator,
    readonly composer: EffectComposer,
    rgbeLoader: RGBELoader,
    private player: Player
  ) {
    this.world.gravity.set(0, -16.81, 0)
    // this.world.defaultContactMaterial.friction = 1
    // this.world.defaultContactMaterial.restitution = 0

    const directionalLight = new DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50

    this.operator.currentScene.add(directionalLight)

    const pointLight = new PointLight(0xffaa00, 1, 20)
    pointLight.position.set(-5, 5, 5)
    pointLight.castShadow = true
    this.operator.currentScene.add(pointLight)

    const pass = new RenderPass(
      this.operator.currentScene,
      this.operator.camera
    )
    composer.addPass(pass)

    const resolution = new Vector2(innerWidth, innerHeight)
    const bloomPass = new UnrealBloomPass(resolution, 1.5, 0.4, 0.85)
    composer.addPass(bloomPass)

    const outputPass = new OutputPass()
    composer.addPass(outputPass)

    rgbeLoader.loadAsync('wildflower_field_2k.hdr').then((texture) => {
      texture.mapping = EquirectangularReflectionMapping
      operator.currentScene.background = texture
      operator.currentScene.backgroundIntensity = 0.09
      operator.currentScene.environment = texture
      operator.currentScene.environmentIntensity = 0.17
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

    this.world.step(this.timeStep)

    for (const updatable of this.#updatables) {
      updatable.update(delta)
    }

    this.composer.render(delta)

    this.stats.end()
  }

  onResize = () => {
    this.operator.camera.resize()
    this.composer.setSize(innerWidth, innerHeight)
    this.renderer.resize()
  }
}
