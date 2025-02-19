import {FontLoader, GLTFLoader} from 'three/examples/jsm/Addons.js'
import {Track, TrackSound, Vehicle, VehicleSound} from './models'
import {Audio, AudioListener, AudioLoader} from 'three'
import {TrackConfig, VehicleConfig} from './interfaces'
import {VehicleDashboard} from './models/vehicle'
import {use} from './core'
import {progress} from './utils'

export const provideTrack = async (config: TrackConfig) => {
  const progress1 = progress()
  loaders.append(progress1.element)
  const gltf = await use(GLTFLoader).loadAsync(
    `tracks/${config.model}.glb`,
    progress1.callback
  )

  const progress2 = progress()
  loaders.append(progress2.element)
  const buffer = await use(AudioLoader).loadAsync(
    config.sound.startLight,
    progress2.callback
  )

  const listener = use(AudioListener)

  const sound = new TrackSound(new Audio(listener).setBuffer(buffer))

  return new Track(gltf, sound, config.settings)
}

export const provideVehicle = async (config: VehicleConfig) => {
  const progress1 = progress()
  loaders.append(progress1.element)

  const gltf = await use(GLTFLoader).loadAsync(
    `vehicles/${config.model}.glb`,
    progress1.callback
  )

  const progress2 = progress()
  loaders.append(progress2.element)
  const buffer = await use(AudioLoader).loadAsync(
    config.sound,
    progress2.callback
  )

  const progress3 = progress()
  loaders.append(progress3.element)
  const font = await use(FontLoader).loadAsync(config.font, progress3.callback)

  const listener = use(AudioListener)

  const sound = new VehicleSound(new Audio(listener).setBuffer(buffer))

  const dashboard = new VehicleDashboard(font, config.dashboard)

  return new Vehicle(gltf, sound, dashboard, config.settings)
}
