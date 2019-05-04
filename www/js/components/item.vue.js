Vue.component("homehub-item", {
  template: `<div class='hh d-flex'>
    <div class='mr-auto'>
        <template v-if="item.icon !== ''">
            <img class='icon' :src="'/icons-mfd-svg/' + item.icon" />
        </template>
        {{ item.name }}
    </div>
    <div>
        <template v-for="(state, index) in item.states">
            <span class='info' style='display: none;'>{{ state.prefix }}<span :class="state.id"></span>{{ state.suffix }}</span>
        </template>                           
    </div>
  </div>`,
  props: ["item"],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
})
