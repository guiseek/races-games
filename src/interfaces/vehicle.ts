import {ColorRepresentation, Vector3Like} from 'three'
import {Direction} from '../core/types'

export type VehicleAction = Direction | 'space' | 'w' | 'a' | 's' | 'd'

export type VehiclePart =
  | 'CollisionChassisBody'
  | 'ChassisBody'
  | 'FrontSuspension'
  | 'RearSuspension'
  | 'CollisionFrontWing'
  | 'CollisionFrontWheelLeft'
  | 'FrontSuspensionHubLeft'
  | 'FrontWheelLeft'
  | 'CollisionFrontWheelRight'
  | 'FrontSuspensionHubRight'
  | 'FrontWheelRight'
  | 'CollisionRearWheelLeft'
  | 'RearWheelLeft'
  | 'CollisionRearWheelRight'
  | 'RearWheelRight'
  | 'SteeringWheelParent'
  | 'SteeringWheelDisplay'
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
  readonly mass: number
  readonly rpm: number
  readonly force: number
  readonly steer: number
  readonly brake: number
  readonly downforce: number
  readonly pointLocalY: number
  readonly gears: VehicleGear[]
}

export interface VehicleDashboardConfig {
  speed: VehicleInfoConfig
  gear: VehicleInfoConfig
}

export interface VehicleConfig {
  model: string
  label: string
  sound: string
  font: string
  dashboard: VehicleDashboardConfig
  settings: VehicleSettings
}
