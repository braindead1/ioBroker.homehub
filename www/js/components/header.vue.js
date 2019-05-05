Vue.component("homehub-header", {
  template: `<header>
    <span></span>
    <span>{{ title }}</span>
    <homehub-clock></homehub-clock>
  </header>`,
  props: ["config"],
  data() {
    return {};
  },
  computed: {
    title () {
      return store.state.title
    }
  },
  mounted() {},
  methods: {}
})
