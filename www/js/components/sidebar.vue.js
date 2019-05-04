Vue.component("homehub-sidebar", {
  template: `<nav id="sidebar" class="offcanvas">
    <template v-for="(category, index) in config">
        <a :id="'nav' + index" href='#' v-bind:class="category.appendDivider === true ? 'mb-3' : ''">
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
  methods: {}
})
