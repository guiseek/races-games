import {GLTFLoader} from 'three/examples/jsm/Addons.js'

export class VehicleService {
  constructor(private gltfLoader: GLTFLoader) {}

  load(id: string) {
    return this.gltfLoader.loadAsync(`vehicles/${id}.glb`)
  }
}
