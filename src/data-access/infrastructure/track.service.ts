import {GLTFLoader} from 'three/examples/jsm/Addons.js'

export class TrackService {
  constructor(private gltfLoader: GLTFLoader) {}

  load(id: string) {
    return this.gltfLoader.loadAsync(`tracks/${id}.glb`)
  }
}
