import {ObjectStartLights, TrackPart} from '../../interfaces'
import {TrackStartLights} from './track-start-lights'
import {GLTF} from 'three/examples/jsm/Addons.js'
import {BodyObject, Partials} from '../../core'
import {TrackSound} from './track-sound'
import {Mesh, Object3D} from 'three'

export class Track {
  partials: Partials<TrackPart>

  startLights: TrackStartLights

  objects = new Set<Object3D>()

  bodyObjects = new Set<BodyObject>()

  positions: Object3D[] = []

  constructor(
    {scene}: GLTF,
    private sound: TrackSound,
    readonly spawnHeight: number,
    readonly rotate: number
  ) {
    this.partials = new Partials(scene)

    const startLights =
      this.partials.getPartial<ObjectStartLights>('StartLights')

    this.startLights = new TrackStartLights(startLights, this.sound)

    const ground = this.partials.getPartial('Ground')
    if (ground) ground.traverse(this.handleObject)

    const collisionGround = this.partials.getPartial('CollisionGround')
    if (collisionGround) collisionGround.traverse(this.handleBodyObject)

    const track = this.partials.getPartial('Track')
    if (track) track.traverse(this.handleObject)

    const collisionTrack = this.partials.getPartial('CollisionTrack')
    if (collisionTrack) collisionTrack.traverse(this.handleBodyObject)

    const walls = this.partials.getPartial('Walls')
    if (walls) walls.traverse(this.handleObject)

    const collisionWalls = this.partials.getPartial('CollisionWalls')
    if (collisionWalls) collisionWalls.traverse(this.handleBodyObject)

    const buildings = this.partials.getPartial('Buildings')
    if (buildings) buildings.traverse(this.handleObject)

    const collisionBuildings = this.partials.getPartial('CollisionBuildings')
    if (collisionBuildings) collisionBuildings.traverse(this.handleBodyObject)

    const objects = this.partials.getPartial('Objects')
    if (objects) objects.traverse(this.handleObject)

    const collisionObjects = this.partials.getPartial('CollisionObjects')
    if (collisionObjects) collisionObjects.traverse(this.handleCollisionObject)

    const positions = this.partials.getPartial('Positions')
    if (positions) {
      positions.traverse((child) => {
        this.positions.push(child)
        this.objects.add(child)
      })
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

  handleObject = (child: Object3D) => this.objects.add(child)
}
