import {Vec3, WheelInfo} from 'cannon-es'
import {Object3D} from 'three'

export class VehicleWheel extends WheelInfo {
  constructor(radius: number, public object: Object3D, pointLocalY: number) {
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

      suspensionStiffness: 100,

      suspensionRestLength: 0.46,

      maxSuspensionTravel: 0.1,

      frictionSlip: 4,

      dampingRelaxation: 2.1,

      dampingCompression: 4.4,

      // rollInfluence: 0.2,
    })
  }
}
