import {Easing, Tween, update} from 'three/examples/jsm/libs/tween.module.js'
import {Perspective} from '../interfaces'
import {Scene, Vector3Like} from 'three'
import {Controls} from './controls'
import {Camera} from './camera'

export class CameraOperator {
  #scenes: Scene[] = []
  #currentScene = 0

  #perspectives: Perspective[] = []
  #currentPerspective = 0

  constructor(
    readonly camera: Camera,
    readonly controls: Controls,
    ...scenes: Scene[]
  ) {
    if (scenes.length) {
      this.#scenes.push(...scenes)
    }
  }

  addPerspective(position: Vector3Like, target: Vector3Like) {
    this.#perspectives.push({position, target})
  }

  switchToPerspective(index: number) {
    if (index < 0 || index >= this.#perspectives.length) {
      throw `Invalid perspective index`
    }

    this.#currentPerspective = index

    const perspective = this.currentPerspective

    new Tween(this.camera.position)
      .to(perspective.position, 1000)
      .easing(Easing.Quadratic.Out)
      .start()

    new Tween(this.controls.target)
      .to(perspective.target, 1000)
      .easing(Easing.Quadratic.Out)
      .start()

    return perspective
  }

  switchToScene(index: number) {
    if (index < 0 || index >= this.#scenes.length) {
      throw `Invalid scene index`
    }

    this.#currentScene = index
  }

  get currentScene() {
    return this.#scenes[this.#currentScene]
  }

  get currentPerspective() {
    return this.#perspectives[this.#currentPerspective]
  }

  update(delta: number) {
    update(delta)

    // this.controls.object.position.copy(this.currentPerspective.position)
    // this.controls.object.position.y += 16
    // this.controls.target.copy(this.currentPerspective.target)

    this.controls.update(delta)
  }
}
