import {FontLoader, GLTFLoader} from 'three/examples/jsm/Addons.js'
import {AudioListener, AudioLoader, TextureLoader} from 'three'
import {createToken, load, set} from './core'
import {Player} from './player'
import {Stage} from './core'

const APP = createToken<HTMLElement>('app.token')

export const setup = () => {
  return load(
    set(
      {ref: APP, use: app},
      {ref: AudioListener},
      {
        ref: GLTFLoader,
        use() {
          return new GLTFLoader().setPath('models/')
        },
      },
      {
        ref: TextureLoader,
        use() {
          return new TextureLoader().setPath('textures/')
        },
      },
      {
        ref: AudioLoader,
        use() {
          return new AudioLoader().setPath('sounds/')
        },
      },
      {
        ref: FontLoader,
        use() {
          return new FontLoader().setPath('fonts/')
        },
      },
      {
        ref: Player,
        dep: [],
      },
      {
        ref: Stage,
        dep: [APP, TextureLoader, Player],
      }
    )
  )
}
