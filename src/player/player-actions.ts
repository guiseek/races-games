import {PlayerAction} from '../interfaces'
import {Actions} from '../core'

export class PlayerActions extends Actions<PlayerAction> {
  state = {
    p: false,
    r: false,
    d: false,
  }

  #paused = false

  get paused() {
    return this.#paused
  }

  constructor() {
    super()

    this.on('p', (state) => {
      if (state) this.#togglePaused()
    })
  }

  #togglePaused = () => {
    this.#paused = !this.#paused
  }
}
