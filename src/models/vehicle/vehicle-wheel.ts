import {Vec3, WheelInfo} from 'cannon-es'
import {Object3D} from 'three'

export class VehicleWheel extends WheelInfo {
  constructor(
    radius: number,
    public object: Object3D,
    public isFrontWheel: boolean,
    pointLocalY: number
  ) {
    const chassisConnectionPointLocal = new Vec3(
      object.position.x,
      object.position.y,
      object.position.z
    )

    chassisConnectionPointLocal.y = pointLocalY

    super({
      radius,
      chassisConnectionPointLocal,
      directionLocal: new Vec3(0, -1, 0),
      axleLocal: new Vec3(-1, 0, 0),

      suspensionStiffness: 200,

      suspensionRestLength: 0.46,

      // maxSuspensionTravel: 0.05,

      frictionSlip: 4,

      dampingRelaxation: 2.3,

      dampingCompression: 4.4,
    })
  }

  setFriction(value: number) {
    this.frictionSlip = value
  }

  applyDownforce(speedFactor: number, downforceFactor: number) {
    this.frictionSlip = Math.min(4 + downforceFactor + speedFactor, 50)
    this.suspensionStiffness = 200 + 50 * downforceFactor
    this.dampingRelaxation = 2.3 + 0.5 * downforceFactor
    this.dampingCompression = 4.4 + 0.5 * downforceFactor
    this.maxSuspensionForce = 10000 + 5000 * downforceFactor
  }
}
