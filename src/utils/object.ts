export const entries = <T extends object, K extends keyof T>(data: T) => {
  return Object.entries(data) as [K, T[K]][]
}

export const keys = <T extends object>(data: T) => {
  return Object.keys(data) as (keyof T)[]
}
