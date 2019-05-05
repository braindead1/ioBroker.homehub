Vue.component("homehub-content", {
    template: `<div id="content" class="panel-group">
        <template v-for="(category, index) in config">
            <div :id="'content' + index" v-show="index === 0">
                <template v-for="(subcategory, index) in category.subcategories">
                    <fieldset class='mb-4'>
                        <legend>{{subcategory.name}}</legend>
                        <homehub-item v-for="(item, index) in subcategory.items" :item="item"></homehub-item>
                    </fieldset>
                </template>
                <homehub-item v-for="(item, index) in category.items" :item="item"></homehub-item>
            </div>
        </template>
    </div>`,
    props: ["config"]
  })
  