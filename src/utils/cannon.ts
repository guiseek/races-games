import {QuaternionLike, Vector3Like, BufferGeometry} from 'three'
import {Vec3, Trimesh, Quaternion} from 'cannon-es'

export const toTrimesh = (geometry: BufferGeometry) => {
  if (!geometry.index) {
    throw `A geometria precisa de indices definidos`
  }

  const vertices = Array.from(geometry.attributes.position.array)
  const indices = Array.from(geometry.index.array)

  return new Trimesh(vertices, indices)
}

export const toVec3 = (v: Vector3Like) => {
  return new Vec3(v.x, v.y, v.z)
}

export const toQuaternion = (q: QuaternionLike) => {
  return new Quaternion(q.x, q.y, q.z, q.w)
}
