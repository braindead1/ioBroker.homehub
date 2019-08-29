<template>
  <span @click="log(state.id)" class='info'>{{ getState(state.id) }}</span>
</template>

<script>
/*
https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md

Indicators (boolean, read-only)
common.type=boolean, common.write=false

The difference of Indicators from Sensors is that indicators will be shown as small icon. Sensors as a real value. So the indicator may not be alone in the channel. It must be some other main state inside channel.

indicator
indicator.alarm - same as indicator.maintenance.alarm
indicator.alarm.fire - fire detected
indicator.alarm.flood - flood detected
indicator.alarm.secure - door or window is opened
indicator.connected - used only for instances. Use indicator.reachable for devices
indicator.lowbat - true if low battery
indicator.maintenance - indicates system warnings/errors, alarms, service messages, battery empty or stuff like that
indicator.maintenance.alarm
indicator.maintenance.lowbat
indicator.maintenance.unreach
indicator.reachable - If device is online
indicator.working - indicates that the target systems is executing something, like blinds or lock opening.
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
              case 'indicator.alarm':
                val = _state.val === true ? 'Alarm' : 'kein Alarm'
                break
              case 'indicator.alarm.fire':
                val = _state.val === true ? 'Feuer' : 'kein Feuer'
                break
              case 'indicator.alarm.flood':
                val = _state.val === true ? 'Nass' : 'Trocken'
                break
             /* case 'indicator.alarm.secure':
                val = _state.val === true ? 'Strom' : 'kein Strom'
                break */
              case 'indicator.connected':
                val = _state.val === true ? 'verbunden' : 'nicht verbunden'
                break
              case 'indicator.lowbat':
                val = _state.val === true ? 'leer' : 'voll'
                break
              case 'indicator.maintenance':
                val = _state.val === true ? 'wahr' : 'falsch'
                break
              case 'indicator.maintenance.alarm':
                val = _state.val === true ? 'Alarm' : 'kein Alarm'
                break
              case 'indicator.maintenance.lowbat':
                val = _state.val === true ? 'leer' : 'voll'
                break
              case 'indicator.maintenance.unreach':
                val = _state.val === true ? 'nicht erreichbar' : 'erreichbar'
                break
              case 'indicator.reachable':
                val = _state.val === true ? 'erreichbar' : 'nicht erreichbar'
                break
              case 'indicator.working':
                val = _state.val === true ? 'aktiv' : 'inaktiv'
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
