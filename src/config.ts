import {TrackConfig, VehicleConfig} from './interfaces'

export const MCLAREN_MP4_5: VehicleConfig = {
  model: 'mclaren-mp4',
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
    steer: 0.3,
    brake: 240,
    pointLocalY: 0.88,
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

export const RED_BULL_RB9: VehicleConfig = {
  model: 'red-bull-rb9',
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
      position: {x: -0.0120, y: 0.645, z: 0.64},
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

export const WROTH: VehicleConfig = {
  model: 'wroth',
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
      position: {x: -0.0120, y: 0.645, z: 0.64},
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

export const INTERLAGOS: TrackConfig = {
  model: 'interlagos',
  sound: {
    startLight: 'start-light.wav',
  },
  settings: {
    airDensity: 1.09,
    rotate: Math.PI / 2,
  },
}

export const SPA: TrackConfig = {
  model: 'spa',
  sound: {
    startLight: 'start-light.wav',
  },
  settings: {
    airDensity: 1.112,
    // height: 0,
    rotate: Math.PI / 2,
  },
}
