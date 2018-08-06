<template lang="pug">
  nav
    .nav-wrapper.blue.lighten-1
      a.brand-logo.right Simple Singage
      ul.left
        <li><router-link :to="{name: 'home'}" class="waves-effect waves-blue">Home</router-link></li>
        <li><a href="#" class="waves-effect waves-blue">Slides</a></li>
        <li><a href="#" class="waves-effect waves-blue">Screens</a></li>
</template>


<script>
export default {
  name: 'navbar'
}
</script>


<style lang="less" scoped>
  .nav-wrapper {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
