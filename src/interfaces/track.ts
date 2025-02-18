import {Mesh, MeshPhysicalMaterial, Object3D} from 'three'
import {Material} from 'cannon-es'

export type TrackPart =
  | 'Ground'
  | 'CollisionGround'
  | 'asphalt'
  | 'astroturf'
  | 'brown_ground'
  | 'grass_outside'
  | 'grass_trackside'
  | 'gravel_runoff'
  | 'runoff'
  | 'Positions'
  | 'Buildings'
  | 'CollisionBuildings'
  | 'Track'
  | 'CollisionTrack'
  | 'track'
  | 'pitlane'
  | 'curbs'
  | 'Walls'
  | 'CollisionWalls'
  | 'Objects'
  | 'CollisionObjects'
  | 'Banners'
  | 'StartLights'
  | 'Tree'

export interface TrackSoundConfig {
  startLight: string
}

export interface TrackSettings {
  airDensity: number
  rotate: number
}

export interface TrackConfig {
  model: string
  label: string
  sound: TrackSoundConfig
  settings: TrackSettings
}

export interface TrackMaterial {
  track: Material
  ground: Material
}

export interface MeshStartLight extends Mesh {
  material: MeshPhysicalMaterial
}

export interface ObjectStartLights extends Object3D {
  children: [MeshStartLight, MeshStartLight, MeshStartLight]
}
