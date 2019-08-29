<template>
  <nav id="sidebar">
    <div
      v-for="(category, index) in categories"
      :key="index"
      v-bind:class="[ category.appendDivider ? 'append_divider' : '', activeCategory === index ? 'active': '' ]"
      @click="showCategory($event, index)"
    >
      <homehub-icon v-if="category.icon !== ''" :icon="category.icon"></homehub-icon>
      {{ category.name }}
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomehubSidebar',
  data () {
    return {
      test: 'Hallo'
    }
  },
  computed: {
    ...mapState([
      'activeCategory',
      'categories'
    ])
  },
  methods: {
    showCategory: function (event, activeCategory) {
      this.$store.dispatch('updateActiveCategory', activeCategory)
    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 250px;
  margin-right: 20px;

  div {
    display: block;
    padding: 10px 10px;
    margin-bottom: 1px;
    background-color: #292929;
    color: #f5f5f5;
    cursor: pointer;
    line-height: 30px;
  }

  div.active {
    background-color: #0e2f44;
  }

  div.append_divider {
    margin-bottom: 20px;
  }
}
</style>
