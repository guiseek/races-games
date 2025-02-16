import {Body, Material} from 'cannon-es'
import {Object3D} from 'three'

export interface BodyObjectOptions {
  mass?: number
  material?: Material
}

export interface BodyObjectBase {
  body: Body
  object: Object3D
}
