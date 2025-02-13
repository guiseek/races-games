import {provideTrack, provideVehicle} from './provide'
import {RED_BULL_RB9, SPA} from './config'
import {setup} from './setup'
import {Stage} from './core'
import {use} from './utils'
import './style.scss'

setup().then(async () => {
  const stage = use(Stage)

  const track = await provideTrack(SPA)

  track.bodyObjects.forEach(({object, body}) => {
    stage.world.addBody(body)
    stage.scene.add(object)
  })

  track.objects.forEach((object) => {
    stage.scene.add(object)
  })

  stage.scene.add(track.startLights.object)

  stage.renderer.render(stage.scene, stage.camera)

  const onInteract = async () => {
    removeEventListener('keydown', onInteract)

    const vehicle = await provideVehicle(RED_BULL_RB9)

    const {x, y, z} = track.positions[3].position
    vehicle.body.position.set(x - 5, y, z)
    vehicle.body.quaternion.setFromEuler(0, track.rotate, 0)

    stage.camera.position.set(0, 0.9, -0.2)
    stage.camera.lookAt(0, 1, 16)

    vehicle.object.add(stage.camera)
    vehicle.body.quaternion.setFromEuler(0, track.rotate, 0)

    vehicle.raycast.addToWorld(stage.world)
    vehicle.wheels.forEach(({object}) => {
      stage.scene.add(object)
    })

    stage.scene.add(vehicle.object)
    stage.addUpdatable(vehicle)

    stage.animate()

    track.startLights.start()
  }

  addEventListener('keydown', onInteract)
})
