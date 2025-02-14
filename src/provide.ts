import {FontLoader, GLTFLoader} from 'three/examples/jsm/Addons.js'
import {Track, TrackSound, Vehicle, VehicleSound} from './models'
import {Audio, AudioListener, AudioLoader} from 'three'
import {TrackConfig, VehicleConfig} from './interfaces'
import {VehicleDashboard} from './models/vehicle'
import {use} from './core'

export const provideTrack = async (config: TrackConfig) => {
  const gltf = await use(GLTFLoader).loadAsync(`tracks/${config.model}.glb`)
  const buffer = await use(AudioLoader).loadAsync(config.sound.startLight)
  const listener = use(AudioListener)

  const sound = new TrackSound(new Audio(listener).setBuffer(buffer))

  return new Track(gltf, sound, config.settings)
}

export const provideVehicle = async (config: VehicleConfig) => {
  const gltf = await use(GLTFLoader).loadAsync(`vehicles/${config.model}.glb`)
  const buffer = await use(AudioLoader).loadAsync(config.sound)
  const font = await use(FontLoader).loadAsync(config.font)
  const listener = use(AudioListener)

  const sound = new VehicleSound(new Audio(listener).setBuffer(buffer))

  const dashboard = new VehicleDashboard(font, config.dashboard)

  return new Vehicle(gltf, sound, dashboard, config.settings)
}
