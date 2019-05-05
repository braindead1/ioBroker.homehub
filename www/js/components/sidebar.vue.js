Vue.component("homehub-sidebar", {
  template: `<nav id="sidebar" class="offcanvas">
    <template v-for="(category, index) in config">
        <a :id="'nav' + index" href='#' v-bind:class="[category.appendDivider === true ? 'mb-3' : '', index === 0 ? 'selected' : '']" v-on:click="showContent($event)">
          <template v-if="category.icon !== ''">
            <img class='icon' :src="'/icons-mfd-svg/' + category.icon" />
          </template>
          {{ category.name }}
        </a>
    </template>
  </nav>`,
  props: ["config"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    showContent: function(event){
      var id = $(event.target).attr('id').replace('nav', 'content');

      $('#sidebar a').removeClass('selected');
      $('#content>div').hide();

      $(event.target).addClass('selected');
      $('#' + id).show();
    }
  }
})