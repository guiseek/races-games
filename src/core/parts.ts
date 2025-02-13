import {Object3D} from 'three'

export class Parts<T extends string = string> {
  constructor(readonly object: Object3D) {}

  getPart<R extends Object3D>(name: T) {
    const part = this.object.getObjectByName(name)

    if (!part) throw `Part ${name} does not found`

    return part as R
  }
}
