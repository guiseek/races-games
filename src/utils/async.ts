import {AsyncCallback} from '../types'

export const async = <T>(executor: AsyncCallback<T>) => {
  return new Promise<T>(executor)
}
