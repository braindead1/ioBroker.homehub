Vue.component("homehub-state", {
  template: `<span class='info'>{{ getState(state.id) }}</span>`,
  props: ["state"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getState: function(id) {
      var prefix = this.state.prefix !== undefined ? this.state.prefix : '';
      var val = store.state.states[id] !== undefined ? store.state.states[id].val : '';
      var suffix = this.state.suffix !== undefined ? this.state.suffix : '';

      if(val !== '') {
        return prefix + store.state.states[id].val + suffix;
      } else {
        return '';
      }
    }
  }
})
