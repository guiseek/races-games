import {BufferGeometry, Mesh, Vector3} from 'three'

export const getBoundingSphere = (geometry: BufferGeometry) => {
  geometry.computeBoundingSphere()

  if (!geometry.boundingSphere) {
    throw `Bounding sphere is ${typeof geometry.boundingSphere}`
  }

  return geometry.boundingSphere
}

export const getBoundingBox = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox()

  if (!geometry.boundingBox) {
    throw `Bounding box is ${typeof geometry.boundingBox}`
  }

  return geometry.boundingBox
}

export const getSize = (mesh: Mesh) => {
  const boundingBox = getBoundingBox(mesh.geometry)

  return boundingBox.getSize(new Vector3())
}

export const getArea = (mesh: Mesh) => {
  const size = getSize(mesh)

  const width = size.x * mesh.scale.x
  const height = size.z * mesh.scale.z

  return width * height
}
