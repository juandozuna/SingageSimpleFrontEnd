<template>
    <iframe :src="src" 
      :width="width" :height="height"
    frameborder="0" ></iframe>

</template>


<script>
export default {
  name: 'vimeo-frame',
  props: {
    code: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 315
    },
    width: {
      type: Number,
      default: 560
    },
    showControls: {
      type: Boolean,
      default: false
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      controls: 0,
      info: 0,
    };
  },
  computed: {
    src(){
      if(this.showControls) this.controls = 1;
      if(this.showInfo) this.info = 1;
      return `https://player.vimeo.com/video/${this.code}?autoplay=1&byline=0&portrait=0`;
    }
  },
  watch: {
    showControls(val){
      if(this.showControls)
        this.controls = 1;
      else this.controls = 0;
    },
    showInfo(val){
      if(this.showInfo) this.info = 1;
      else this.info = 0;
    }
  }

}
</script>
