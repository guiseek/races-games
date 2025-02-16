import {AsyncCallback} from '../core'

export const async = <T>(executor: AsyncCallback<T>) => {
  return new Promise<T>(executor)
}

export const asyncAll = <T>(executors: PromiseLike<T>[]) => {
  return Promise.all<T>(executors)
}
