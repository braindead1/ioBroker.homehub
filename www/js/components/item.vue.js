Vue.component("homehub-item", {
  template: `<div class='hh d-flex'>
    <div class='mr-auto'>
        <template v-if="item.icon !== ''">
            <img class='icon' :src="'/icons-mfd-svg/' + item.icon" />
        </template>
        {{ item.name }}
    </div>
    <div>
        <homehub-state v-for="(state, index) in item.states" :state="state"></homehub-state>
    </div>
  </div>`,
  props: ["item"],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
})
