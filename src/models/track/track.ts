import {TrackStartLights} from './track-start-lights'
import {GLTF} from 'three/examples/jsm/Addons.js'
import {BodyObject, Partials} from '../../core'
import {Group, Mesh, Object3D} from 'three'
import {Vehicle} from '../vehicle/vehicle'
import {traverseShadow} from '../../utils'
import {TrackSound} from './track-sound'
import {ContactMaterial, Material, Vec3} from 'cannon-es'
import {
  ObjectStartLights,
  TrackSettings,
  TrackMaterial,
  TrackPart,
} from '../../interfaces'

export class Track {
  partials: Partials<TrackPart>

  startLights: TrackStartLights

  bodyObjects = new Set<BodyObject>()

  positions: Object3D[] = []

  #vehicles = new Set<Vehicle>()

  object: Group

  #material: TrackMaterial

  contacts: ContactMaterial[] = []

  constructor(
    {scene}: GLTF,
    private sound: TrackSound,
    readonly settings: TrackSettings
  ) {
    this.object = new Group()

    this.partials = new Partials(scene)

    this.#material = {
      track: new Material({friction: 1, restitution: 0.1}),
      ground: new Material({friction: 0.6, restitution: 0.2}),
    }

    const startLights =
      this.partials.getPartial<ObjectStartLights>('StartLights')

    this.startLights = new TrackStartLights(startLights, this.sound)

    const ground = this.partials.getPartial('Ground')
    if (ground) this.object.add(ground)

    const collisionGround = this.partials.getPartial('CollisionGround')
    if (collisionGround)
      collisionGround.traverse(this.handleBodyObject(this.#material.ground))

    const track = this.partials.getPartial('Track')
    if (track) this.object.add(track)

    const tree = this.partials.getPartial('Tree')
    if (tree) this.object.add(tree)

    const collisionTrack = this.partials.getPartial('CollisionTrack')
    if (collisionTrack)
      collisionTrack.traverse(this.handleBodyObject(this.#material.track))

    const walls = this.partials.getPartial('Walls')
    if (walls) this.object.add(walls)

    const collisionWalls = this.partials.getPartial('CollisionWalls')
    if (collisionWalls) collisionWalls.traverse(this.handleBodyObject())

    const buildings = this.partials.getPartial('Buildings')
    if (buildings) this.object.add(buildings)

    const collisionBuildings = this.partials.getPartial('CollisionBuildings')
    if (collisionBuildings) collisionBuildings.traverse(this.handleBodyObject())

    const objects = this.partials.getPartial('Objects')
    if (objects) this.object.add(objects)

    const collisionObjects = this.partials.getPartial('CollisionObjects')
    if (collisionObjects) collisionObjects.traverse(this.handleCollisionObject)

    const positions = this.partials.getPartial('Positions')
    if (positions) {
      this.positions = positions.children
      this.object.add(positions)
    }

    traverseShadow(this.object)
  }

  handleCollisionObject = (child: Object3D) => {
    if (child instanceof Mesh) {
      this.bodyObjects.add(new BodyObject(child, {mass: 0.1}))
    }
  }

  handleBodyObject = (material?: Material) => (child: Object3D) => {
    if (child instanceof Mesh) {
      this.bodyObjects.add(new BodyObject(child, {material}))
    }
  }

  addVehicle(vehicle: Vehicle) {
    this.object.add(vehicle.object)

    this.contacts.push(
      new ContactMaterial(vehicle.material, this.#material.ground, {
        friction: 0.4,
      }),
      new ContactMaterial(vehicle.material, this.#material.track, {
        friction: 0.8,
      })
    )

    vehicle.wheels.forEach(({object}) => {
      this.object.add(object)
    })

    this.#vehicles.add(vehicle)
  }

  update(delta: number) {
    for (const vehicle of this.#vehicles) {
      const downforce = vehicle.determineDownforce(this.settings.airDensity)
      const velocity = vehicle.raycast.currentVehicleSpeedKmHour

      const speedFactor = velocity / 100
      const downforceFactor = downforce / 10000

      for (const wheel of vehicle.wheels) {
        wheel.applyDownforce(speedFactor, downforceFactor)
      }

      vehicle.body.applyForce(new Vec3(0, -downforce, 0))

      vehicle.update(delta)
    }
  }
}
