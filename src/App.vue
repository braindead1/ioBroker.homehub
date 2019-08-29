<template>
  <div id="app" v-cloak>
    <homehub-header></homehub-header>
    <div id="wrapper">
      <homehub-sidebar></homehub-sidebar>
      <homehub-content></homehub-content>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import HomehubContent from './components/HomehubContent.vue'
import HomehubHeader from './components/HomehubHeader.vue'
import HomehubSidebar from './components/HomehubSidebar.vue'

export default {
  name: 'app',
  components: {
    HomehubContent,
    HomehubHeader,
    HomehubSidebar
  },
  computed: {
    ...mapState([
      'categories',
      'states'
    ])
  },
  created: function () {
    this.$store.dispatch('initialize')

    /* that.$socket.emit('getVersion', function (version) {
      // console.log(version)
      // if (callback) callback(version)
    })

    that.$socket.emit('getState', 'admin.0.info.lastUpdateCheck', function (a, state) {
      console.log(state)
      // if (callback) callback(version)
    })

    that.$socket.emit('getStates', function (a, states) {
      console.log(states)
      // if (callback) callback(version)
    })

    that.$socket.emit('getObject', 'admin.0.info.lastUpdateCheck', function (a, state) {
      console.log(state)
      // if (callback) callback(version)
    })

    that.$socket.emit('getObjects', function (a, states) {
      console.log(states)
      // if (callback) callback(version)
    }) */

    // that.$socket.emit('subscribe', 'info.*')
    // that.$socket.emit('subscribe', 'info.*')
  }
}
</script>

<style lang="scss">
* {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  background-color: black;
  color: white;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
}
</style>

<style lang="scss" scoped>
#wrapper {
  width: 75%;
  margin: 75px auto 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
