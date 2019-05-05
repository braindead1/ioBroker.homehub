Vue.component("homehub-icon", {
  template: `<img class='icon' :src="'/icons-mfd-svg/' + icon" />`,
  props: ["icon"]
})
