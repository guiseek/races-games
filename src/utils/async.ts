import {AsyncCallback} from '../core'

export const async = <T>(executor: AsyncCallback<T>) => {
  return new Promise<T>(executor)
}
