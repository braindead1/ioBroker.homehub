Vue.component("homehub-header", {
  template: `<header>
    <span></span>
    <span>{{ title }}</span>
    <homehub-clock></homehub-clock>
  </header>`,
  props: ["config"],
  computed: {
    title () {
      return store.state.title
    }
  }
})
