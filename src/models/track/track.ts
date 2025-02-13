import {ObjectStartLights, TrackPart, TrackSettings} from '../../interfaces'
import {TrackStartLights} from './track-start-lights'
import {GLTF} from 'three/examples/jsm/Addons.js'
import {BodyObject, Partials} from '../../core'
import {Group, Mesh, Object3D} from 'three'
import {Vehicle} from '../vehicle/vehicle'
import {TrackSound} from './track-sound'
import {Vec3} from 'cannon-es'

export class Track {
  partials: Partials<TrackPart>

  startLights: TrackStartLights

  bodyObjects = new Set<BodyObject>()

  positions: Object3D[] = []

  #vehicles = new Set<Vehicle>()

  object: Group

  constructor(
    {scene}: GLTF,
    private sound: TrackSound,
    readonly settings: TrackSettings
  ) {
    this.object = new Group()

    this.partials = new Partials(scene)

    const startLights =
      this.partials.getPartial<ObjectStartLights>('StartLights')

    this.startLights = new TrackStartLights(startLights, this.sound)

    const ground = this.partials.getPartial('Ground')
    if (ground) this.object.add(ground)

    const collisionGround = this.partials.getPartial('CollisionGround')
    if (collisionGround) collisionGround.traverse(this.handleBodyObject)

    const track = this.partials.getPartial('Track')
    if (track) this.object.add(track)

    const collisionTrack = this.partials.getPartial('CollisionTrack')
    if (collisionTrack) collisionTrack.traverse(this.handleBodyObject)

    const walls = this.partials.getPartial('Walls')
    if (walls) this.object.add(walls)

    const collisionWalls = this.partials.getPartial('CollisionWalls')
    if (collisionWalls) collisionWalls.traverse(this.handleBodyObject)

    const buildings = this.partials.getPartial('Buildings')
    if (buildings) this.object.add(buildings)

    const collisionBuildings = this.partials.getPartial('CollisionBuildings')
    if (collisionBuildings) collisionBuildings.traverse(this.handleBodyObject)

    const objects = this.partials.getPartial('Objects')
    if (objects) this.object.add(objects)

    const collisionObjects = this.partials.getPartial('CollisionObjects')
    if (collisionObjects) collisionObjects.traverse(this.handleCollisionObject)

    const positions = this.partials.getPartial('Positions')
    if (positions) {
      this.positions = positions.children
      this.object.add(positions)
    }
  }

  handleCollisionObject = (child: Object3D) => {
    if (child instanceof Mesh) {
      this.bodyObjects.add(new BodyObject(child, {mass: 0.1}))
    }
  }

  handleBodyObject = (child: Object3D) => {
    if (child instanceof Mesh) {
      this.bodyObjects.add(new BodyObject(child))
    }
  }

  addVehicle(vehicle: Vehicle) {
    this.object.add(vehicle.object)

    vehicle.wheels.forEach(({object}) => {
      this.object.add(object)
    })

    this.#vehicles.add(vehicle)
  }

  update(delta: number) {
    for (const vehicle of this.#vehicles) {
      const downforce = vehicle.determineDownforce(this.settings.airDensity)
      const velocity = vehicle.body.velocity.length()

      vehicle.body.applyForce(new Vec3(0, -downforce, 0))

      const downforceFactor = downforce / 10000
      const speedFactor = velocity / 100

      /** Aumenta o atrito */
      const friction = 4 + downforceFactor + speedFactor

      /** Aumenta a rigidez */
      const suspensionStiffness = 100 + 50 * downforceFactor

      /** Aumenta o amortecimento */
      const dampingRelaxation = 2.5 + 0.5 * downforceFactor

      /** Aumenta o amortecimento */
      const dampingCompression = 4.5 + 0.5 * downforceFactor

      /** Aumenta a força máxima */
      const maxSuspensionForce = 10000 + 5000 * downforceFactor

      for (const wheel of vehicle.wheels) {
        wheel.frictionSlip = Math.min(friction, 10)

        wheel.suspensionStiffness = suspensionStiffness
        wheel.dampingRelaxation = dampingRelaxation
        wheel.dampingCompression = dampingCompression
        wheel.maxSuspensionForce = maxSuspensionForce
      }

      vehicle.update(delta)
    }
  }
}
