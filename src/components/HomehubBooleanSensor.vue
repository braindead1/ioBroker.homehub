<template>
  <span @click="log(state.id)" class='info'>{{ getState(state.id) }}</span>
</template>

<script>
/*
https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md

Sensor (booleans, read-only)
common.type=boolean, common.write=false

sensor.alarm - some common alarm
sensor.alarm.fire - fire sensor
sensor.alarm.flood - water leakage
sensor.alarm.power - No power (voltage = 0)
sensor.alarm.secure - door opened, window opened or motion detected during alarm is ON.
sensor.door - door opened (true) or closed (false)
sensor.light - feedback from lamp, that it is ON
sensor.lock - actual position of lock
sensor.motion - motion sensor
sensor.noise - noise detected
sensor.rain - rain detected
sensor.window - window opened (true) or closed (false)
*/

import { mapState } from 'vuex'

export default {
  name: 'HomehubBooleanSensor',
  props: [
    'state'
  ],
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'states',
      'objects'
    ])
  },
  methods: {
    getState: function (id) {
      let prefix = this.state.prefix !== undefined ? this.state.prefix : ''
      let suffix = this.state.suffix !== undefined ? this.state.suffix : ''
      let val = ''

      let _object = null
      let _state = null

      let _retVal = ''

      if (id in this.objects) {
        _object = this.objects[id]

        if (id in this.states) {
          _state = this.states[id]

          if ('val' in _state) {
            switch (_object.common.role) {
              case 'sensor.alarm':
                val = _state.val === true ? 'Alarm' : 'kein Alarm'
                break
              case 'sensor.alarm.fire':
                val = _state.val === true ? 'Feuer' : 'kein Feuer'
                break
              case 'sensor.alarm.flood':
                val = _state.val === true ? 'Nass' : 'Trocken'
                break
              case 'sensor.alarm.power':
                val = _state.val === true ? 'Strom' : 'kein Strom'
                break
              case 'sensor.alarm.secure':
                val = _state.val === true ? 'sicher' : 'unsicher'
                break
              case 'sensor.door':
                val = _state.val === true ? 'offen' : 'geschlossen'
                break
              case 'sensor.light':
                val = _state.val === true ? 'an' : 'aus'
                break
              case 'sensor.lock':
                val = _state.val === true ? 'offen' : 'verschlossen'
                break
              case 'sensor.motion':
                val = _state.val === true ? 'Bewegung' : 'keine Bewegung'
                break
              case 'sensor.noise':
                val = _state.val === true ? 'laut' : 'leise'
                break
              case 'sensor.rain':
                val = _state.val === true ? 'Regen' : 'kein Regen'
                break
              case 'sensor.window':
                val = _state.val === true ? 'offen' : 'geschlossen'
                break
              default:
                val = _state.val === true ? 'wahr' : 'falsch'
            }

            val = _state.val === true ? 'Bewegung' : 'keine Bewegung'

            if (val !== '') {
              _retVal = prefix + val + suffix
            }
          }
        }
      }

      return _retVal
    },

    log: function (id) {
      if (id in this.objects) {
        let _object = this.objects[id]

        console.log(_object.common.type, _object.common.role, _object)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: inline-block;
  margin-left: 10px;
}
</style>
