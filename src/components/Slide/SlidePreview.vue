<template lang="pug">
    div.no-padding.no-margin
      img(v-if="slide.role == 'image'", :src="slide.image", style="height: 100%; width: 100%;").no-margin.no-padding
      video-embeder(v-else, :type="slide.role", :code="slide.video" :autoplay="false", :showControls="true", :height="height", :width="width")
</template>


<script>
import VideoEmbeder from '../../components/Videos/VideoEmbeder';
export default {
  name: 'slide-preview',
  props: ['slide', 'height', 'width'],
  components: {
    VideoEmbeder: VideoEmbeder
  }
}
</script>
