<template>
  <div class="item">
    <div>
      <homehub-icon v-if="item.icon !== ''" :icon="item.icon"></homehub-icon>
      {{ item.name }}
    </div>
    <div>
      <component v-for="(state, index) in item.states" :state="state" :key="index" :is="getComponentName(state.id)"></component>
    </div>
  </div>
</template>

<script>
import HomehubState from './HomehubState.vue'
import HomehubBooleanIndicator from './HomehubBooleanIndicator.vue'
import HomehubBooleanSensor from './HomehubBooleanSensor.vue'
import HomehubBooleanState from './HomehubBooleanState.vue'
import HomehubBooleanSwitch from './HomehubBooleanSwitch.vue'
import HomehubBooleanValueWindow from './HomehubBooleanValueWindow.vue'

import { mapState } from 'vuex'

export default {
  name: 'HomehubItem',
  props: [
    'item'
  ],
  components: {
    HomehubState,
    HomehubBooleanIndicator,
    HomehubBooleanSensor,
    HomehubBooleanState,
    HomehubBooleanSwitch,
    HomehubBooleanValueWindow
  },
  computed: {
    ...mapState([
      'states',
      'objects'
    ])
  },
  methods: {
    getComponentName: function (id) {
      if (id in this.objects) {
        let _object = this.objects[id]

        if (_object.common.type === 'boolean' && (_object.common.role).substring(0, 9) === 'indicator') return 'homehub-boolean-indicator'
        if (_object.common.type === 'boolean' && (_object.common.role).substring(0, 6) === 'sensor') return 'homehub-boolean-sensor'
        if (_object.common.type === 'boolean' && _object.common.role === 'state') return 'homehub-boolean-state'
        if (_object.common.type === 'boolean' && _object.common.role === 'switch') return 'homehub-boolean-switch'
        if (_object.common.type === 'boolean' && _object.common.role === 'value.window') return 'homehub-boolean-value-window'

        return 'homehub-state'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 10px;
  margin-bottom: 1px;
  background-color: #292929;
  color: #f5f5f5;
  line-height: 30px;
}
</style>
