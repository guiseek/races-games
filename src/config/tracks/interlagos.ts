import {TrackConfig} from '../../interfaces'

export const INTERLAGOS: TrackConfig = {
  model: 'interlagos',
  label: 'Interlagos',
  sound: {
    startLight: 'start-light.wav',
  },
  settings: {
    airDensity: 1.09,
    rotate: Math.PI / 2,
  },
}
