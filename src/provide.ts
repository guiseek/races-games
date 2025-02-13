import {Track, TrackSound, Vehicle, VehicleSound} from './models'
import {TrackService, VehicleService} from './data-access'
import {VehicleInfo} from './models/vehicle/vehicle-info'
import {Audio, AudioListener, AudioLoader} from 'three'
import {TrackConfig, VehicleConfig} from './interfaces'
import {FontLoader} from 'three/examples/jsm/Addons.js'
import {use} from './utils'

export const provideTrack = async (config: TrackConfig) => {
  const listener = use(AudioListener)
  const buffer = await use(AudioLoader).loadAsync(config.sound.startLight)
  const gltf = await use(TrackService).load(config.model)

  const sound = new TrackSound(new Audio(listener).setBuffer(buffer))

  return new Track(gltf, sound, config.spawnHeight, config.rotate)
}

export const provideVehicle = async (config: VehicleConfig) => {
  const gltf = await use(VehicleService).load(config.model)
  const buffer = await use(AudioLoader).loadAsync(config.sound)
  const font = await use(FontLoader).loadAsync(config.font)
  const listener = use(AudioListener)

  const sound = new VehicleSound(new Audio(listener).setBuffer(buffer))

  const info = new VehicleInfo(config.info.color, font, config.info.size)
  info.position.copy(config.info.position)
  info.rotation.y = -Math.PI

  return new Vehicle(gltf, sound, info, config.settings)
}
