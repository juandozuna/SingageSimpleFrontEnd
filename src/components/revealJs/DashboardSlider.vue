<template>
    <div class="slider">
      <div class="slides">
        <li v-for="(slide, key) in slides" :key="key">
          <img :src="slide.image" :alt="slide.title" v-if="slide.role == 'image'">
          <video-embeder :code="slide.video" v-else :type="slide.role" styles="width: 100%; height: 100%" 
          :height="100" :width="100"></video-embeder>
        </li>
      </div>
    </div>
</template>

<script>
import VideoEmbeder from '../../components/Videos/VideoEmbeder';
export default {
  name: 'dashboard-slider',
  props: ['slides'],
  components: {
    VideoEmbeder: VideoEmbeder
  },
  data(){
    return {

    };
  },
  watch: {
    slides(val){
      $('.slider').slider();
    }
  }
}
</script>
