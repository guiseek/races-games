import {TrackConfig, VehicleConfig} from './interfaces'

export const MCLAREN_MP4_5: VehicleConfig = {
  model: 'mclaren-mp4-5',
  sound: 'mclaren.wav',
  font: 'seven-segment-regular.typeface.json',
  info: {
    color: 0x181818,
    position: {x: -0.02, y: 0.7356, z: 0.4},
    size: 0.008,
  },
  pointLocalY: 0,
  settings: {
    rpm: 7000,
    force: 3200,
    steer: 0.3,
    brake: 800,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 0.1, speed: 50},
      {gear: 1, ratio: 3.5, speed: 70},
      {gear: 2, ratio: 3, speed: 90},
      {gear: 3, ratio: 2.5, speed: 120},
      {gear: 4, ratio: 2, speed: 180},
      {gear: 5, ratio: 1.5, speed: 220},
      {gear: 6, ratio: 1, speed: 260},
    ],
  },
}

export const RED_BULL_RB9: VehicleConfig = {
  model: 'red-bull-rb9',
  sound: 'red-bull.wav',
  font: 'seven-segment-regular.typeface.json',
  info: {
    color: 0xff0033,
    position: {x: 0.0058, y: 0.659, z: 0.69},
    size: 0.016,
  },
  pointLocalY: 0,
  settings: {
    rpm: 7000,
    force: 3200,
    steer: 0.3,
    brake: 1000,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 0.1, speed: 50},
      {gear: 1, ratio: 3.5, speed: 70},
      {gear: 2, ratio: 3, speed: 90},
      {gear: 3, ratio: 2.5, speed: 120},
      {gear: 4, ratio: 2, speed: 180},
      {gear: 5, ratio: 1.5, speed: 220},
      {gear: 6, ratio: 1, speed: 260},
    ],
  },
}

export const INTERLAGOS: TrackConfig = {
  model: 'interlagos',
  sound: {
    startLight: 'start-light.wav',
  },
  spawnHeight: -12,
  rotate: Math.PI / 2,
}

export const SPA: TrackConfig = {
  model: 'spa',
  sound: {
    startLight: 'start-light.wav',
  },
  spawnHeight: 0,
  rotate: Math.PI / 2,
}
