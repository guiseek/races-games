import {VehicleAction} from '../../interfaces'
import {Actions} from '../../core'

export class VehicleActions extends Actions<VehicleAction> {
  state = {
    up: false,
    right: false,
    down: false,
    left: false,
    space: false,
  }
}
