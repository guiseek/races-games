export const calculateDownforce = (
  velocity: number,
  coefficient: number,
  area: number,
  airDensity: number
) => {
  return 0.5 * airDensity * Math.pow(velocity, 2) * coefficient * area
}
