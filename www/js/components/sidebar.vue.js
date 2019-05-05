Vue.component("homehub-sidebar", {
  template: `<nav id="sidebar" class="offcanvas">
    <template v-for="(category, index) in config">
        <a :id="'nav' + index" href='#' v-bind:class="[category.appendDivider === true ? 'mb-3' : '', index === 0 ? 'selected' : '']" v-on:click="showContent($event)">
          <homehub-icon v-if="category.icon !== ''" :icon="category.icon"></homehub-icon>
          {{ category.name }}
        </a>
    </template>
  </nav>`,
  props: ["config"],
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