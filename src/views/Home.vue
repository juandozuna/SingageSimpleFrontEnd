<template>
  <div class="home">
    <h1 class="center-align primary-text blue lighten-5 
    round-border box-padding z-depth-4 no-bottom-margin">
      Dashboard
    </h1>
    <div class="row">
      <div class="col s12">
        <registered-slides></registered-slides>
      </div>
      <div class="col s12">
        <registered-screens></registered-screens>
      </div>
    </div>
  </div>
</template>

<script>
import RegisteredSlides from '@/components/RegisteredSlides.vue';
import RegisteredScreens from '@/components/RegisteredScreens.vue';
export default {
  name: 'home',
  components: {
    RegisteredSlides: RegisteredSlides,
    RegisteredScreens: RegisteredScreens
  }

}
</script>


<style lang="less">


</style>
