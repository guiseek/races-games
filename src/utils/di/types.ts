import {Abstract, Fn, Type} from '../../types'
import {Token} from './token'

export type Ref<T> = Abstract<T> | Type<T> | Token<T>

export type Use<T> = T | Type<T> | Fn<T> | Fn<Promise<T>>

export interface Provider<T> {
  ref: Ref<T>
  use?: Use<T>
  dep?: Ref<unknown>[]
}
