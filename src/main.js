import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'

import HomehubContent from '@/components/HomehubContent.vue'
import HomehubHeader from '@/components/HomehubHeader.vue'
import HomehubIcon from '@/components/HomehubIcon.vue'
import HomehubItem from '@/components/HomehubItem.vue'
import HomehubSidebar from '@/components/HomehubSidebar.vue'
import HomehubState from '@/components/HomehubState.vue'

Vue.component('HomehubContent', HomehubContent)
Vue.component('HomehubHeader', HomehubHeader)
Vue.component('HomehubIcon', HomehubIcon)
Vue.component('HomehubItem', HomehubItem)
Vue.component('HomehubSidebar', HomehubSidebar)
Vue.component('HomehubState', HomehubState)

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  // debug: true,
  connection: 'http://192.168.10.3:8084/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '/socket.io/' } // Optional options
}))

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
