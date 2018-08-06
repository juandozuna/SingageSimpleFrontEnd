<template>
    <div>
      <youtube-frame :code="cd"
                      :height="h"
                      :width="w"
                      :showControls="controls"
                      :showInfo="info "
                      :class="classes"
                      :style="styles"
                      :autoplay="play" 
                      v-if="youtube"></youtube-frame>

       <vimeo-frame :code="cd"
                    :height="h"
                    :width="w"
                    :showControls="controls"
                    :showInfo="info"
                    :class="classes"
                    :style="styles"
                    :autoplay="play" 
                    v-else-if="vimeo"></vimeo-frame>

      <local-frame :code="cd"
                    :height="h"
                    :width="w"
                    :showControls="controls"
                    :showInfo="info "
                    :class="classes"
                    :style="styles"
                    :autoplay="play" 
                    v-else-if="local"></local-frame>

      <div v-else>
          <h4 class="orange-text text-darken-4 center-align">The solicited method is not available in this platform</h4>
      </div>


    </div>
</template>


<script>
import YoutubeFrame from './YoutubeFrame';
import VimeoFrame from './VimeoFrame';
import LocalFrame from './LocalFrame';
export default {
  name: 'video-embeder',
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
      default: true
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'youtube',
      required: true
    },
    classes: {
      type: String
    },
    styles: {
      type: String
    } 
  },
  components: {
    YoutubeFrame: YoutubeFrame,
    VimeoFrame: VimeoFrame,
    LocalFrame: LocalFrame
  },
  data(){
    return{
      youtube: false,
      vimeo: false,
      local: false,
      notSupported: false,
      w: this.width,
      h: this.height,
      play: this.autoplay,
      controls: this.showControls,
      info: this.showInfo,
      cd: this.code
    }
  },
  watch: {
    type(val){
      this.changeType();
    },
    code(val){
      this.cd = val;
    }
  },
  methods: {
    changeType(){
      if(this.type === 'youtube'){
          this.youtube = true;
          this.vimeo = false;
          this.local = false;
          this.notSupported = false;
      }else if(this.type === 'vimeo'){
          this.youtube = false;
          this.vimeo = true;
          this.local = false;
          this.notSupported = false;
      }else if(this.type === 'local'){
          this.youtube = false;
          this.vimeo = false;
          this.local = true;
          this.notSupported = false;
      }else{
          this.youtube = false;
          this.vimeo = false;
          this.local = false;
          this.notSupported = true;
      }
    }
  },
  created(){
    this.changeType();
  }
}


/**
 * The Display Video Embeds Are
 * 
 * YouTube Video TODO: 
 * Vimeo Video TODO:
 * Local Video TODO:
 */
</script>
