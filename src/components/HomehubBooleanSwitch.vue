<template>
  <span @click="log(state.id)" class='info'>{{ getState(state.id) }}</span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomehubBooleanSwitch',
  props: [
    'state'
  ],
  data () {
    return {
      test: 'Hallo'
    }
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

      if (id in this.states) {
        let _state = this.states[id]

        if ('val' in _state) {
          val = _state.val === true ? 'an' : 'aus'
        }
      }

      if (val !== '') {
        return prefix + val + suffix
      } else {
        return ''
      }
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
