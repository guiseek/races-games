import {Quaternion, Vec3, World} from 'cannon-es'
import {interval} from '../utils'

export interface ReplayObject {
  position: Vec3
  quaternion: Quaternion
  velocity: Vec3
  angularVelocity: Vec3
}

export interface ReplayFrame {
  time: number
  objects: ReplayObject[]
}

export class Replay {
  #state: ReplayFrame[] = []

  constructor(private world: World) {}

  #captureState = () => {
    const state: ReplayFrame = {
      time: performance.now(),
      objects: [],
    }

    this.world.bodies.forEach((body) => {
      state.objects.push({
        position: body.position.clone(),
        quaternion: body.quaternion.clone(),
        velocity: body.velocity.clone(),
        angularVelocity: body.angularVelocity.clone(),
      })
    })

    this.#state.push(state)
  }

  start(timeStep: number) {
    const stop = interval(this.#captureState, timeStep)

    return {stop}
  }

  replay = () => {
    let replayIndex = 0
    let replayFrame = -1

    const stop = () => cancelAnimationFrame(replayFrame)

    const replayFn = () => {
      if (replayIndex >= this.#state.length) stop()

      const state = this.#state[replayIndex]

      state.objects.forEach((state, index) => {
        const body = this.world.bodies[index]
        body.position.copy(state.position)
        body.quaternion.copy(state.quaternion)
        body.velocity.copy(state.velocity)
        body.angularVelocity.copy(state.angularVelocity)
      })

      replayIndex++

      replayFrame = requestAnimationFrame(replayFn)
    }

    return {stop}
  }
}
