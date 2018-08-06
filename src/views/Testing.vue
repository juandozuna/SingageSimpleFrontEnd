<template>
<div>
  <h3 class="center-align red-text darken-2">Testing</h3>
  <div class="row">
    <div class="col s6">
      <select v-model="videoType">
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="local">Local</option>
          <option value="facebook">FaceBook</option>
      </select>
    </div>
    <div class="col s6">
      <input type="text" v-model="videoId" placeholder="Video ID">
    </div>
  </div>
  <video-embeder :type="videoType" :code="videoId" :show-controls="false" classes="z-depth-1 round-border">
  </video-embeder>
</div>
</template>


<script>
 import VideoEmbeder from '../components/Videos/VideoEmbeder.vue';
export default {
  name: 'testing',
  components: {
    VideoEmbeder: VideoEmbeder
  },
  data(){
    return {
      videoId: '9TIZMohIYqQ',
      videoType: 'youtube',
      availableVideos: ['youtube', 'vimeo', 'local'],
      display: false
    }
  },
  methods: {

  }


}
</script>
