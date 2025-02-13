import {Mesh, MeshPhysicalMaterial, Object3D} from 'three'

export type TrackPart =
  | 'Ground'
  | 'CollisionGround'
  | 'Positions'
  | 'Buildings'
  | 'CollisionBuildings'
  | 'Track'
  | 'CollisionTrack'
  | 'Walls'
  | 'CollisionWalls'
  | 'Objects'
  | 'CollisionObjects'
  | 'Banners'
  | 'StartLights'

export interface TrackSoundConfig {
  startLight: string
}

export interface TrackSettings {
  airDensity: number
  rotate: number
}

export interface TrackConfig {
  model: string
  sound: TrackSoundConfig
  settings: TrackSettings
}

export interface MeshStartLight extends Mesh {
  material: MeshPhysicalMaterial
}

export interface ObjectStartLights extends Object3D {
  children: [MeshStartLight, MeshStartLight, MeshStartLight]
}
