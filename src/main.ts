import {tracks, vehicles} from './config'
import {Track, Vehicle} from './models'
import {events} from './utils'
import {setup} from './setup'
import {Stage} from './core'
import {use} from './core'
import './style.scss'

const init = () => {
  const trackConfig = tracks['spa-francoschamps']
  const vehicleConfig = vehicles['rb20']

  setup(trackConfig, vehicleConfig).then(async () => {
    const stage = use(Stage)

    const track = use(Track)

    const vehicle = use(Vehicle)

    /**
     * Veicle
     */
    const {position} = track.positions[5]
    vehicle.body.position.set(position.x - 5, position.y + 2, position.z)
    vehicle.body.quaternion.setFromEuler(0, track.settings.rotate, 0)

    stage.operator.camera.position.set(0.02, 1.02, -0.27)
    stage.operator.camera.lookAt(0, -2, 16)

    vehicle.object.add(stage.operator.camera)

    stage.operator.addPerspective(position, vehicle.body.position)

    vehicle.raycast.addToWorld(stage.world)

    track.addVehicle(vehicle)

    track.contacts.forEach((contact) => {
      stage.world.addContactMaterial(contact)
    })

    stage.addUpdatable(track)

    /**
     * Track
     */
    track.bodyObjects.forEach(({object, body}) => {
      stage.world.addBody(body)
      stage.operator.currentScene.add(object)
    })

    stage.operator.currentScene.add(track.object)

    stage.operator.currentScene.add(track.startLights.object)

    stage.animate()

    track.startLights.start()
  })

  off()
}

const off = events(init, 'click', 'keydown')
