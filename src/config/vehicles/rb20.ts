import { VehicleConfig } from "../../interfaces";

export const RB20: VehicleConfig = {
  model: 'rb20',
  sound: 'rb20.wav',
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
    mass: 920,
    rpm: 7000,
    force: 4800,
    downforce: 0.8,
    steer: 0.3,
    brake: 320,
    pointLocalY: 0,
    gears: [
      {gear: -1, ratio: -2.5, speed: 50},
      {gear: 0, ratio: 2.5, speed: 60},
      {gear: 1, ratio: 3.5, speed: 80},
      {gear: 2, ratio: 3, speed: 100},
      {gear: 3, ratio: 2.5, speed: 120},
      {gear: 4, ratio: 2, speed: 160},
      {gear: 5, ratio: 1.5, speed: 200},
      {gear: 6, ratio: 1, speed: 240},
      {gear: 7, ratio: 0.75, speed: 280},
      {gear: 8, ratio: 0.75, speed: 320},
    ],
  },
}