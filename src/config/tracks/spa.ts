import {TrackConfig} from '../../interfaces'

export const SPA: TrackConfig = {
  model: 'spa-francoschamps',
  label: 'Spa-Francorchamps',
  sound: {
    startLight: 'start-light.wav',
  },
  settings: {
    airDensity: 1.112,
    // height: 0,
    rotate: Math.PI / 2,
  },
}
