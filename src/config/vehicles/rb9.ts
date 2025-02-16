import {VehicleConfig} from '../../interfaces'

export const RB9: VehicleConfig = {
  model: 'red-bull-rb9',
  label: 'Red Bull RB9',
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
    mass: 540,
    rpm: 7000,
    force: 2400,
    downforce: 0.77,
    steer: 0.3,
    brake: 1000,
    pointLocalY: 0,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 0.1, speed: 50},
      {gear: 1, ratio: 3.5, speed: 70},
      {gear: 2, ratio: 3, speed: 90},
      {gear: 3, ratio: 2.5, speed: 120},
      {gear: 4, ratio: 2, speed: 150},
      {gear: 5, ratio: 1.5, speed: 180},
      {gear: 6, ratio: 1, speed: 220},
    ],
  },
}
