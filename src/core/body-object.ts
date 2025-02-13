import {toQuaternion, toTrimesh, toVec3} from '../utils'
import {BodyObjectOptions} from '../interfaces'
import {Body} from 'cannon-es'
import {Mesh} from 'three'

export class BodyObject {
  body: Body

  constructor(readonly object: Mesh, options: BodyObjectOptions = {}) {
    const {mass = 0, material} = options
    const type = mass ? Body.DYNAMIC : Body.STATIC

    this.body = new Body({type, mass, material})

    const shape = toTrimesh(object.geometry)
    const offset = toVec3(object.position)
    const orientation = toQuaternion(object.quaternion)

    this.body.addShape(shape, offset, orientation)
  }

  update() {
    this.object.position.copy(this.body.position)
    this.object.quaternion.copy(this.body.quaternion)
  }
}
