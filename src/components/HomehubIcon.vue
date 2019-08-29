<template>
  <img class='icon' :src="'http://192.168.10.3:8082/icons-mfd-svg/' + icon" />
</template>

<script>
export default {
  name: 'HomehubIcon',
  props: [
    'icon'
  ]
}
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
