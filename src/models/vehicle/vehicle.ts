import {VehiclePart, VehicleSettings} from '../../interfaces'
import {Body, Material, RaycastVehicle} from 'cannon-es'
import {VehicleDashboard} from './vehicle-dashboard'
import {GLTF} from 'three/examples/jsm/Addons.js'
import {lerp} from 'three/src/math/MathUtils.js'
import {VehicleActions} from './vehicle-actions'
import {VehicleWheel} from './vehicle-wheel'
import {Group, Mesh, Object3D} from 'three'
import {VehicleState} from './vehicle-state'
import {VehicleSound} from './vehicle-sound'
import {Partials} from '../../core'
import {
  toVec3,
  getArea,
  toTrimesh,
  toQuaternion,
  getBoundingSphere,
  calculateDownforce,
  traverseShadow,
} from '../../utils'

export class Vehicle {
  parts: Partials<VehiclePart>

  body: Body

  object: Object3D

  raycast: RaycastVehicle

  wheels: VehicleWheel[] = []

  actions: VehicleActions

  state: VehicleState

  steering = {
    maxAngle: Math.PI / 6,
    minAngle: Math.PI / 20,
  }

  steeringWheel: Object3D
  steeringWheelDisplay: Object3D
  wheelHubLeft?: Object3D
  wheelHubRight?: Object3D

  material: Material

  chassis: Mesh

  frontWingArea: number

  maxSpeed: number

  constructor(
    {scene}: GLTF,
    private sound: VehicleSound,
    private dashboard: VehicleDashboard,
    private settings: VehicleSettings
  ) {
    this.parts = new Partials(scene)

    this.actions = new VehicleActions()

    this.material = new Material({friction: 1, restitution: 0.1})

    this.body = new Body({mass: settings.mass, material: this.material})
    this.body.collisionResponse = true
    this.body.updateMassProperties()

    this.steeringWheel = this.parts.getPartial<Mesh>('SteeringWheelParent')
    this.steeringWheelDisplay = this.parts.getPartial<Mesh>(
      'SteeringWheelDisplay'
    )

    this.wheelHubLeft = this.parts.getPartial('FrontSuspensionHubLeft')
    this.wheelHubRight = this.parts.getPartial('FrontSuspensionHubRight')

    this.chassis = this.parts.getPartial<Mesh>('CollisionChassisBody')

    const frontWing = this.parts.getPartial<Mesh>('CollisionFrontWing')

    this.frontWingArea = getArea(frontWing)

    this.body.position.set(
      this.chassis.position.x,
      this.chassis.position.y,
      this.chassis.position.z
    )

    this.body.quaternion.set(
      this.chassis.quaternion.x,
      this.chassis.quaternion.y,
      this.chassis.quaternion.z,
      this.chassis.quaternion.w
    )

    this.body.angularDamping = 0.9
    this.body.linearDamping = 0.1

    const shape = toTrimesh(this.chassis.geometry)
    const offset = toVec3(this.chassis.position)
    const orientation = toQuaternion(this.chassis.quaternion)
    this.body.addShape(shape, offset, orientation)

    this.raycast = new RaycastVehicle({
      chassisBody: this.body,
      indexRightAxis: 0,
      indexUpAxis: 1,
      indexForwardAxis: 2,
    })

    this.object = new Group()
    this.object.add(this.parts.getPartial<Mesh>('ChassisBody'))

    const frontSuspension = this.parts.getPartial('FrontSuspension')
    if (frontSuspension) this.object.add(frontSuspension)

    const rearSuspension = this.parts.getPartial('RearSuspension')
    if (rearSuspension) this.object.add(rearSuspension)

    // this.object.add(this.dashboard.gear, this.dashboard.speed)
    this.steeringWheelDisplay.add(this.dashboard.gear, this.dashboard.speed)

    this.state = new VehicleState(0, 1, 800)

    this.maxSpeed = this.settings.gears[this.settings.gears.length - 1].speed

    {
      const collision = this.parts.getPartial<Mesh>('CollisionFrontWheelLeft')
      const wheel = this.parts.getPartial<Object3D>('FrontWheelLeft')
      const radius = collision.geometry.boundingSphere!.radius
      const pointLocalY = settings.pointLocalY
        ? settings.pointLocalY
        : radius * 1.5
      this.addWheel(collision, wheel, pointLocalY, true)
    }

    {
      const collision = this.parts.getPartial<Mesh>('CollisionFrontWheelRight')
      const wheel = this.parts.getPartial<Object3D>('FrontWheelRight')
      const radius = collision.geometry.boundingSphere!.radius
      const pointLocalY = settings.pointLocalY
        ? settings.pointLocalY
        : radius * 1.5
      this.addWheel(collision, wheel, pointLocalY, true)
    }

    {
      const collision = this.parts.getPartial<Mesh>('CollisionRearWheelLeft')
      const wheel = this.parts.getPartial<Object3D>('RearWheelLeft')
      const radius = collision.geometry.boundingSphere!.radius
      const pointLocalY = settings.pointLocalY
        ? settings.pointLocalY
        : radius * 1.5
      this.addWheel(collision, wheel, pointLocalY)
    }

    {
      const collision = this.parts.getPartial<Mesh>('CollisionRearWheelRight')
      const wheel = this.parts.getPartial<Object3D>('RearWheelRight')
      const radius = collision.geometry.boundingSphere!.radius
      const pointLocalY = settings.pointLocalY
        ? settings.pointLocalY
        : radius * 1.5
      this.addWheel(collision, wheel, pointLocalY)
    }

    traverseShadow(this.object)

    this.listen()
  }

  determineDownforce(airDensity: number) {
    return calculateDownforce(
      this.body.velocity.length(),
      this.settings.downforce,
      this.frontWingArea,
      airDensity
    )
  }

  update(deltaTime: number) {
    const steeringSpeed = 1.2 * deltaTime
    const leftPressed = this.actions.state.left || this.actions.state.a
    const rightPressed = this.actions.state.right || this.actions.state.d

    const steeringInput = (leftPressed ? 1 : 0) - (rightPressed ? 1 : 0)

    if (steeringInput === 0) {
      if (this.state.steering > 0) {
        this.state.setSteering(Math.max(0, this.state.steering - steeringSpeed))
      } else if (this.state.steering < 0) {
        this.state.setSteering(Math.min(0, this.state.steering + steeringSpeed))
      }
    } else {
      this.state.incSteering(steeringInput * steeringSpeed)
      this.state.setSteering(
        Math.max(
          -this.settings.steer,
          Math.min(this.settings.steer, this.state.steering)
        )
      )
    }

    const speedAvarage =
      this.raycast.chassisBody.velocity.length() / this.maxSpeed

    const speedFactor = Math.min(1, speedAvarage)

    const steeringAngle = lerp(
      this.steering.maxAngle,
      this.steering.minAngle,
      speedFactor
    )

    const steering = this.state.steering * steeringAngle * 5

    this.steeringWheel.rotation.z = -steering

    if (this.wheelHubLeft && this.wheelHubRight) {
      this.wheelHubLeft.rotation.y = steering * 0.5
      this.wheelHubRight.rotation.y = steering * 0.5
    }

    const gear = this.settings.gears[this.state.gear]

    const speed = this.raycast.chassisBody.velocity.length()

    this.state.setRPM((speed / gear.speed) * this.settings.rpm)

    if (this.state.rpm > this.settings.rpm) {
      this.state.setRPM(this.settings.rpm)
      // } else if (this.state.rpm < 1000) {
      //   this.state.setRPM(1000)
    }

    /**
     * Gears
     */
    const currentGear = this.state.gear
    const maxGear = this.settings.gears.length - 1

    if (this.state.rpm > 6000 && currentGear < maxGear) {
      this.state.shiftUp()
    } else if (this.state.rpm < 3000 && currentGear > 1) {
      this.state.shiftDown()
    }

    {
      this.dashboard.update(
        this.state.gear,
        Math.max(0, this.raycast.currentVehicleSpeedKmHour / 1.9)
      )
    }

    /**
     * Sound
     */
    this.sound.update(this.state.rpm)

    /**
     * Apply steering wheel
     */
    this.raycast.setSteeringValue(this.state.steering, 0)
    this.raycast.setSteeringValue(this.state.steering, 1)

    /**
     * Vehicle position
     */
    this.object.position.copy(this.body.position)
    this.object.quaternion.copy(this.body.quaternion)

    /**
     * Wheels state
     */
    for (let i = 0; i < this.raycast.wheelInfos.length; i++) {
      this.raycast.updateWheelTransform(i)
      const wheel = this.raycast.wheelInfos[i]

      const {position, quaternion} = this.wheels[i].object

      position.copy(wheel.worldTransform.position)
      quaternion.copy(wheel.worldTransform.quaternion)
    }
  }

  protected addWheel(
    collision: Mesh,
    object: Object3D,
    pointLocalY: number,
    isFrontWheel = false
  ) {
    const {radius} = getBoundingSphere(collision.geometry)
    const wheel = new VehicleWheel(radius, object, isFrontWheel, pointLocalY)
    this.raycast.addWheel(wheel)
    this.wheels.push(wheel)
  }

  protected listen() {
    const accelerate = (state: boolean) => {
      if (state) {
        this.raycast.applyEngineForce(-this.settings.force, 2)
        this.raycast.applyEngineForce(-this.settings.force, 3)
      } else {
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    }

    this.actions.trigger(accelerate, ['up', 'w'])

    const unaccelerate = (state: boolean) => {
      if (state) {
        this.raycast.applyEngineForce(this.settings.force, 2)
        this.raycast.applyEngineForce(this.settings.force, 3)
      } else {
        this.raycast.applyEngineForce(0, 2)
        this.raycast.applyEngineForce(0, 3)
      }
    }

    this.actions.trigger(unaccelerate, ['down', 's'])

    this.actions.on('space', (state) => {
      if (state) {
        this.raycast.setBrake(this.settings.brake, 0)
        this.raycast.setBrake(this.settings.brake, 1)
        this.raycast.setBrake(this.settings.brake, 2)
        this.raycast.setBrake(this.settings.brake, 3)
      } else {
        this.raycast.setBrake(0, 0)
        this.raycast.setBrake(0, 1)
        this.raycast.setBrake(0, 2)
        this.raycast.setBrake(0, 3)
      }
    })
  }
}
