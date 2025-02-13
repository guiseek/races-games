import {PlayerActions} from './player-actions'

export class Player {
  actions: PlayerActions

  constructor() {
    this.actions = new PlayerActions()
  }
}
