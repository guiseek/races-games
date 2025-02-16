import { VehicleConfig } from "../../interfaces";

export const RB20: VehicleConfig = {
  model: 'rb20',
  sound: 'red-bull.wav',
  label: 'Red Bull RB20',
  font: 'seven-segment-regular.typeface.json',
  dashboard: {
    gear: {
      color: 0x4d5468,
      position: {x: 0.0, y: 0.006, z: -0.018},
      size: 0.012,
    },
    speed: {
      color: 0x414860,
      position: {x: 0.0, y: 0.026, z: -0.018},
      size: 0.008,
    },
  },
  settings: {
    mass: 540,
    rpm: 7000,
    force: 4200,
    downforce: 0.8,
    steer: 0.4,
    brake: 320,
    pointLocalY: 0,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 1.3, speed: 60},
      {gear: 1, ratio: 3.5, speed: 80},
      {gear: 2, ratio: 3, speed: 100},
      {gear: 3, ratio: 2.5, speed: 130},
      {gear: 4, ratio: 2, speed: 180},
      {gear: 5, ratio: 1.5, speed: 220},
      {gear: 6, ratio: 1, speed: 280},
      {gear: 7, ratio: 0.75, speed: 320},
      {gear: 8, ratio: 0.75, speed: 360},
    ],
  },
}