<template>
    <div class="card col" :class="colSize">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" :src="slide.image" v-if="slide.role === 'image'" style="width: 100%; height: 10em">
      <div v-else class="round-border z-depth-1">
        <video-embeder :code="slide.video" :type="slide.role" :autoplay="false" styles="width: 100%; height: 9.6em"></video-embeder>
      </div>
    </div>
    <div class="card-content">
      <span class=" tooltipped card-title" style="font-size: 1.5em" :title="slide.title">{{slide.title.substring(0, 11)}}
        <span v-show="slide.title.length >= 12">...</span>
      </span>
      <span class="right col s4">
        <input type="text" v-model="slide.displayOrder" @change="update">
      </span>
      <a href="#">Details</a> &nbsp; <a href="#" class="activator">Options</a>
      <button class="btn-small red lighten-2 white-text round-border z-depth-2" @click="removeFromScreen" v-show="deleteBtn">Remove</button>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{slide.title}}<i> X </i></span>
      <div class="input-field">
        <input type="text" v-model="slide.title" @change="update">
        <label for="">Title</label>
      </div>
      <div class="input-field col s6">
        <input type="text" v-model="slide.subtitle" @change="update">
        <label for="">Subtitle</label>
      </div>
      <div class="col s6 switch">
        <label>
          H
        <input type="checkbox" v-model="slide.visible" @change="update">
        <span class="lever"></span>
          V
        </label>
        
      </div>
    </div>
  </div>
</template>

<script>
import VideoEmbeder from './Videos/VideoEmbeder';
import Axios from 'axios';
const apiUrl = require('../assets/variables.js').apiUrl;
export default {
  name: 'slide-card',
  props: ['colSize', 'screen', 'deleteBtn', 'slide', 'title'],
  components: {
    VideoEmbeder: VideoEmbeder
  },
  data(){
    return{

    };
  },
  methods: {
    removeFromScreen(){
      let sid = this.screen;
      let slide = this.slide;

      let data = {
        screens: [sid]
      };
      Axios.post(`${apiUrl}/slides/screen/removeslide/${slide._id}`, data)
        .then(resp => {
          console.log(resp);
          this.$emit('removed', slide);
        })
        .catch(err => {
          console.error(err);
        })
    },
    update(){
      let uri = `${apiUrl}/slides/edit/${this.slide._id}`
      let data = {
        title: this.slide.title,
        subtitle: this.slide.subtitle,
        viewSchedule: this.slide.viewSchedule,
        visible: this.slide.visible,
        overlayHtml: this.slide.overlayHtml,
        displayOrder: parseInt(this.slide.displayOrder)
      };
      Axios.post(uri, data)
      .then(resp => {
        console.log(resp.data);
        M.toast({html: "Slide was updated succesfully", classes: "green rounded"});
      })
      .catch(err => {
        console.log(err)
      });
    },
    order(){
       this.update();
    }
  }
}
</script>

