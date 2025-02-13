import {VehicleDashboardConfig} from '../../interfaces'
import {Font} from 'three/examples/jsm/Addons.js'
import {VehicleInfo} from './vehicle-info'

export class VehicleDashboard {
  gear: VehicleInfo

  speed: VehicleInfo

  constructor(font: Font, config: VehicleDashboardConfig) {
    this.gear = new VehicleInfo(config.gear.color, font, config.gear.size)
    this.gear.position.copy(config.gear.position)
    this.gear.rotation.y = -Math.PI

    this.speed = new VehicleInfo(config.speed.color, font, config.speed.size)
    this.speed.position.copy(config.speed.position)
    this.speed.rotation.y = -Math.PI
  }

  update(gear: number, speed: number) {
    this.gear.update(gear)

    this.speed.update(speed.toFixed().padStart(4, '0').split('').join(' '))
  }
}
