import {ColorRepresentation, Vector3Like} from 'three'
import {Direction} from '../types'

export type VehicleAction = Direction | 'space'

export type VehiclePart =
  | 'CollisionChassisBody'
  | 'ChassisBody'
  | 'FrontSuspension'
  | 'RearSuspension'
  | 'CollisionFrontWheelLeft'
  | 'FrontWheelLeft'
  | 'CollisionFrontWheelRight'
  | 'FrontWheelRight'
  | 'CollisionRearWheelLeft'
  | 'RearWheelLeft'
  | 'CollisionRearWheelRight'
  | 'RearWheelRight'
  | 'SteeringWheelParent'
  | 'SteeringWheel'

export interface VehicleInfoConfig {
  color: ColorRepresentation
  position: Vector3Like
  size: number
}

export interface VehicleGear {
  gear: number
  ratio: number
  speed: number
}

export interface VehicleSettings {
  readonly rpm: number
  readonly force: number
  readonly steer: number
  readonly brake: number
  readonly gears: VehicleGear[]
}

export interface VehicleConfig {
  model: string
  sound: string
  font: string
  info: VehicleInfoConfig
  pointLocalY: number
  settings: VehicleSettings
}
