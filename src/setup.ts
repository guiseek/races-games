import {AudioListener, AudioLoader, Scene, TextureLoader} from 'three'
import {TrackConfig, VehicleConfig} from './interfaces'
import {provideTrack, provideVehicle} from './provide'
import {Track, Vehicle} from './models'
import {Player} from './player'
import {Stage} from './core'
import {
  EffectComposer,
  FontLoader,
  GLTFLoader,
  RGBELoader,
} from 'three/examples/jsm/Addons.js'
import {
  set,
  load,
  Camera,
  Controls,
  Renderer,
  createToken,
  CameraOperator,
} from './core'

const APP = createToken<HTMLElement>('app.token')
const TRACK_CONFIG = createToken<TrackConfig>('track.config.token')
const VEHICLE_CONFIG = createToken<VehicleConfig>('vehicle.config.token')

export const setup = (
  trackConfig: TrackConfig,
  vehicleConfig: VehicleConfig
) => {
  return load(
    set(
      {ref: APP, use: app},
      {ref: AudioListener},
      {
        ref: GLTFLoader,
        use() {
          return new GLTFLoader().setPath('models/')
        },
      },
      {
        ref: TextureLoader,
        use() {
          return new TextureLoader().setPath('textures/')
        },
      },
      {
        ref: RGBELoader,
        use() {
          return new RGBELoader().setPath('envs/')
        },
      },
      {
        ref: AudioLoader,
        use() {
          return new AudioLoader().setPath('sounds/')
        },
      },
      {
        ref: FontLoader,
        use() {
          return new FontLoader().setPath('fonts/')
        },
      },
      {
        ref: Player,
        dep: [],
      },
      {
        ref: Scene,
      },
      {
        ref: Camera,
      },
      {
        ref: Renderer,
        dep: [APP],
      },
      {
        ref: Controls,
        dep: [Camera, Renderer],
      },
      {
        ref: CameraOperator,
        dep: [Camera, Controls, Scene],
      },
      {
        ref: EffectComposer,
        dep: [Renderer],
      },
      {
        ref: Stage,
        dep: [
          APP,
          Renderer,
          CameraOperator,
          EffectComposer,
          RGBELoader,
          Player,
        ],
      },
      {
        ref: TRACK_CONFIG,
        use: trackConfig,
      },
      {
        ref: VEHICLE_CONFIG,
        use: vehicleConfig,
      },
      {
        ref: Track,
        use: provideTrack,
        dep: [TRACK_CONFIG],
      },
      {
        ref: Vehicle,
        use: provideVehicle,
        dep: [VEHICLE_CONFIG],
      }
    )
  )
}
