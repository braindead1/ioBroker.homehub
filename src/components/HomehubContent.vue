<template>
  <div id="content">
    <div v-for="(category, index) in categories" :id="'content' + index" :key="index" v-show="activeCategory === index">
      <fieldset v-for="(subcategory, index) in category.subcategories" :key="index" class="mb-4">
        <legend>{{subcategory.name}}</legend>
        <homehub-item v-for="(item, index) in subcategory.items" :item="item" :key="index"></homehub-item>
      </fieldset>
      <homehub-item v-for="(item, index) in category.items" :item="item" :key="index"></homehub-item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomehubContent',
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
  }
}
</script>

<style lang="scss" scoped>
#content {
  margin-bottom: 20px;
  overflow: hidden;
  flex-grow: 1;

  fieldset {
    border: 0;
    padding: 0;
    margin: 0px 0px 30px 0px;

    legend {
      margin-bottom: 10px;
      line-height: 30px;
    }
  }
}
</style>
