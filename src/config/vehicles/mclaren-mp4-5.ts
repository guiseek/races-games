import {VehicleConfig} from '../../interfaces'

export const MCLAREN_MP4_5: VehicleConfig = {
  model: 'mclaren-mp4-5',
  label: 'McLaren MP4/5',
  sound: 'red-bull.wav',
  font: 'seven-segment-regular.typeface.json',
  dashboard: {
    gear: {
      color: 0x666666,
      position: {x: -0.001, y: 0.787, z: 0.52},
      size: 0.008,
    },
    speed: {
      color: 0x666666,
      position: {x: -0.014, y: 0.787, z: 0.52},
      size: 0.008,
    },
  },
  settings: {
    mass: 640,
    rpm: 7000,
    force: 3600,
    downforce: 0.5,
    steer: 0.4,
    brake: 240,
    pointLocalY: 0.84,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 1.3, speed: 50},
      {gear: 1, ratio: 3.5, speed: 90},
      {gear: 2, ratio: 3, speed: 140},
      {gear: 3, ratio: 2.5, speed: 170},
      {gear: 4, ratio: 2, speed: 200},
      {gear: 5, ratio: 1.5, speed: 240},
      {gear: 6, ratio: 1, speed: 270},
    ],
  },
}
