export type Fn<T> = (...params: unknown[]) => T

export type Abstract<T> = abstract new (...params: unknown[]) => T

export interface Type<T> extends NewableFunction {
  new (...params: any[]): T
}
