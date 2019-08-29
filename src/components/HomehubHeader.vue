<template>
  <header>
    <div></div>
    <div id="title">HomeHub</div>
    <div>{{ time }}</div>
  </header>
</template>

<script>
export default {
  name: 'HomehubHeader',
  data () {
    return {
      time: ''
    }
  },
  mounted: function () {
    setInterval(() => {
      let now = new Date()

      this.time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ' Uhr'
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #0e2f44;
  padding: 10px 20px;
  box-shadow: 0 0px 10px 5px black;
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 30px;
}
</style>
