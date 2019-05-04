Vue.component("homehub-clock", {
  template: `<span id="time">{{ time }}</span>`,
  data: function data() {
    return {
      time: ''
    };
  },
  mounted() {
    this.updateTime();
  },
  methods: {
    updateTime: function() {
      var self = this;
      var now = new Date();

      self.time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ' Uhr';

      setTimeout(self.updateTime, 1000);
    }
  }
})