import {he} from './create'

export const progress = () => {
  const element = he('progress', {max: 100, value: 0})
  const callback = ({loaded, total}: ProgressEvent) => {
    const percent = (loaded / total) * 100
    element.value = Math.round(percent)
    if (element.value >= 99) element.remove()
  }
  return {element, callback}
}
