import {provideTrack, provideVehicle} from './provide'
import {MCLAREN_MP4_5, INTERLAGOS} from './config'
import {Stage} from './core'
import {setup} from './setup'
import {use} from './core'
import './style.scss'

setup().then(async () => {
  const stage = use(Stage)

  const track = await provideTrack(INTERLAGOS)

  track.bodyObjects.forEach(({object, body}) => {
    stage.world.addBody(body)
    stage.scene.add(object)
  })

  stage.scene.add(track.object)

  stage.scene.add(track.startLights.object)

  stage.renderer.render(stage.scene, stage.camera)

  const onInteract = async () => {
    removeEventListener('keydown', onInteract)

    const vehicle = await provideVehicle(MCLAREN_MP4_5)

    const {position} = track.positions[2]
    vehicle.body.position.set(position.x - 5, position.y, position.z)
    vehicle.body.quaternion.setFromEuler(0, track.settings.rotate, 0)

    stage.camera.position.set(0, 0.91, -0.26)
    stage.camera.lookAt(0, 1, 16)

    vehicle.object.add(stage.camera)

    vehicle.raycast.addToWorld(stage.world)

    track.addVehicle(vehicle)

    stage.addUpdatable(track)

    stage.animate()

    track.startLights.start()
  }

  addEventListener('keydown', onInteract)
})
