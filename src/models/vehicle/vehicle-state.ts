export class VehicleState {
  #steering: number

  get steering() {
    return this.#steering
  }

  #gear: number

  get gear() {
    return this.#gear
  }

  #rpm: number

  get rpm() {
    return this.#rpm
  }

  constructor(steering: number, gear: number, rpm: number) {
    this.#steering = steering
    this.#gear = gear
    this.#rpm = rpm
  }

  setSteering(value: number) {
    this.#steering = value
  }

  incSteering(value: number) {
    this.#steering += value
  }

  setGear(value: number) {
    this.#gear = value
  }

  setRPM(value: number) {
    this.#rpm = value
  }

  shiftUp() {
    this.#gear++
  }

  shiftDown() {
    if (this.#gear > 0) {
      this.#gear--
    }
  }
}
