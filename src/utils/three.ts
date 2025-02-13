import {BufferGeometry} from 'three'

export const getBoundingSphere = (geometry: BufferGeometry) => {
  geometry.computeBoundingSphere()

  if (!geometry.boundingSphere) {
    throw `Bounding sphere is ${typeof geometry.boundingSphere}`
  }

  return geometry.boundingSphere
}
