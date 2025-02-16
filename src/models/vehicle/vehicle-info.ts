import {ColorRepresentation, Mesh, MeshBasicMaterial} from 'three'
import {Font, TextGeometry} from 'three/examples/jsm/Addons.js'

export class VehicleInfo extends Mesh {
  constructor(
    readonly color: ColorRepresentation,
    readonly font: Font,
    readonly size: number,
    readonly depth = 0,
    readonly bevelSize = 0.01
  ) {
    const options = {font, size, depth, bevelSize}
    const geometry = new TextGeometry('0', options)
    const material = new MeshBasicMaterial({color})
    super(geometry, material)

    geometry.computeBoundingBox()
    if (!geometry.boundingBox) {
      throw `VehicleInfo BoundingBox does not computed`
    }
    const {max, min} = geometry.boundingBox
    this.position.x = -size * (max.x - min.x)
  }

  update(value: number | string) {
    this.geometry.dispose()
    this.geometry = new TextGeometry(String(value), this)
  }
}
