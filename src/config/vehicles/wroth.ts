import {VehicleConfig} from '../../interfaces'

export const WROTH: VehicleConfig = {
  model: 'wroth',
  label: 'Wroth (custom)',
  sound: 'red-bull.wav',
  font: 'seven-segment-regular.typeface.json',
  dashboard: {
    gear: {
      color: 0xff0033,
      position: {x: 0.0058, y: 0.643, z: 0.64},
      size: 0.015,
    },
    speed: {
      color: 0xff0033,
      position: {x: -0.012, y: 0.645, z: 0.64},
      size: 0.011,
    },
  },
  settings: {
    mass: 640,
    rpm: 8000,
    force: 4200,
    downforce: 1.19,
    steer: 0.4,
    brake: 300,
    pointLocalY: 0,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 0.7, speed: 70},
      {gear: 1, ratio: 3.5, speed: 110},
      {gear: 2, ratio: 3, speed: 140},
      {gear: 3, ratio: 2.5, speed: 170},
      {gear: 4, ratio: 2, speed: 200},
      {gear: 5, ratio: 1.5, speed: 240},
      {gear: 6, ratio: 1, speed: 270},
      {gear: 7, ratio: 0.7, speed: 300},
      {gear: 8, ratio: 0.5, speed: 340},
    ],
  },
}
