Vue.component("homehub-item", {
  template: `<div class='hh d-flex'>
    <div class='mr-auto'>
      <homehub-icon v-if="item.icon !== ''" :icon="item.icon"></homehub-icon>
       {{ item.name }}
    </div>
    <div>
      <homehub-state v-for="(state, index) in item.states" :state="state"></homehub-state>
    </div>
  </div>`,
  props: ["item"]
})
