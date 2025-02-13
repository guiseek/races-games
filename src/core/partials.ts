import {Object3D} from 'three'

export class Partials<T extends string = string> {
  constructor(readonly object: Object3D) {}

  getPartial(name: T): Object3D | undefined
  getPartial<R>(name: T): R
  getPartial(name: T) {
    return this.object.getObjectByName(name)
  }
}
