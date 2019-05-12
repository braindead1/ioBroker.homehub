Vue.component("homehub-state", {
  template: `<span class='info'>{{ getState(state.id) }}</span>`,
  props: ["state"],
  methods: {
    getState: function(id) {
      var prefix = this.state.prefix !== undefined ? this.state.prefix : '';
      var suffix = this.state.suffix !== undefined ? this.state.suffix : '';
      var val = '';

      if(id in store.state.objects) {
        if("state" in store.state.objects[id]) {
          if("val" in store.state.objects[id]["state"]) {
            val = store.state.objects[id]["state"].val;
          }          
        }
      }

      if(val !== '') {
        return prefix + val + suffix;
      } else {
        return '';
      }
      
    }
  }
})
