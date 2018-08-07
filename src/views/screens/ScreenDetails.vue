<template lang="pug">
  div
    h4.center-align.smaller 
      | Details 
      span.blue-text.text-lighten-3 {{screen.name}}
    
    .row
      .col.s3
        .card.blue.lighten-4.z-depth-5
          .card-content.black-text
            span.card-title SCREEN DETAILS
            ul.collection
                li.collection-item.blue.darken-1 Framework: <span class="right colspan-card">{{screen.framework}}</span>
                li.collection-item.blue.darken-1 Slides: <span class="right colspan-card">{{slides.length}}</span>
        .slide-container
          slide-card(v-for="(slide, key) in slides" v-bind:key="key" 
          v-bind:slide="slide" v-bind:title="slide.title" colSize="s12" 
          :screen="screen._id" deleteBtn="true" @removed="slideRemoved")
          .card.gray.lighten-4.black-text(v-show="slides.length == 0")
            .card-content
              h4.center-align This Screen Has No Slides Assigned
      .col.s6.round-border.red.lighten-5.setHeight.z-depth-3.padding-top.padding-left.padding-right
        h4.center-align.red-text.text-lighten-1 Controls
        .row
          .col.s6
            .range-field.blue-text
              label(for="range") Slideshow Speed {{screen.speed}}
              input(type="range",v-model="screen.speed", id="range", min="1000", max="12000" @change="update")
          .col.s6
            .col.s6.input-field
              input.autocomplete(type="text", v-model="screen.name")
              label Screen Name
            .col.s6
              button.btn-large.red.darken-2.white-text.smallText(@click="update") Update Name
        .row
          .col.s4
            | Controls
            .switch
              label
                | Hidden
                input(type="checkbox",v-model="screen.showControls" @change="update")
                span.lever
                | Display
          .col.s4
            a.btn-large.red(@click="prev") Previous Slide
          .col.s4
            a.btn-large.red(@click="next") Next Slide
          

      .col.s3
        ul.collection
          li.collection-item(v-for="(slide, key) in allSlides", :key="key") 
            button.btn-small.green.lighten-2.round-border.margin-right.white-text(@click="addToScreen(slide)") Add
            | {{slide.title}} <span class="grey-text text-lighten-1 smallText">{{slide.role}}</span>
            img.right(:src="slide.image",v-if="slide.role == 'image'",width="40px",height="30px")
            video-embeder.right(v-else, :type="slide.role", :code="slide.video", :showControls="false", :autoplay="false" styles="height: 30px; width: 40px; display: inline-block")
    
</template>


<script>
const apiUrl = require('../../assets/variables.js').apiUrl;
const eventBus = require('../../assets/events.js').eventBus;
import Axios from 'axios';
import VideoEmbeder from '../../components/Videos/VideoEmbeder';
const axios = require('axios');

import SlideCard from '@/components/SlideCard.vue';
export default {
  name: 'screen-details',
  components: {
    SlideCard: SlideCard,
    VideoEmbeder: VideoEmbeder
  },
  data(){
    return{
      screen: {},
      slides: [],
      name: '',
      allSlides: [],
      size: 0,
      text: 'Text'
    };
  },
  methods: {
    getDetails(){
      Axios.get(`${apiUrl}/screens/single/${this.$route.params.name}`)
        .then((resp) => {
          console.log('data');
          console.log(resp);
          this.screen = resp.data.screen;
          this.name = this.screen.name;
          this.slides = resp.data.slides;
        })
        .catch((err) => console.log(err));
      Axios.get(`${apiUrl}/slides`).then(resp => this.allSlides = resp.data).catch(err => console.log(err));
    },
    slideRemoved(slide){
      let i = this.slides.indexOf(slide);
      if(i > -1)
        this.slides.splice(i, 1);
           M.toast({html: "<strong>Slide</strong> was succesfully removed from " + this.screen.name, classes: ' green'});
    },
    addToScreen(slide){
      let screen = this.screen;

      let data = {
        screens: [screen._id]
      };
      if(this.slides.indexOf(slide) <= -1){
      Axios.post(`${apiUrl}/slides/screen/addslide/${slide._id}`, data)
        .then(resp => {
          if(resp.data.nModified === 1){
          console.log(resp);
          this.slides.push(slide);
           M.toast({html: "<strong>Slide</strong> was succesfully added to " + this.screen.name, classes: ' green'});
          }
          else {
            M.toast({html: "The slide you're trying to add, already exists in this screen", classes: ' yellow darken-2 '});
          }
        })
        .catch(err => {
          console.error(err);
        })
      }
      else {
        M.toast({html: "The slide you're trying to add, already exists in this screen", classes: ' yellow darken-2'});
      }
    },
    update(){
      let data = {
        name: this.screen.name,
        showControls: this.screen.showControls,
        speed: this.screen.speed,
        framework: this.screen.framework
      }
      Axios.post(`${apiUrl}/screens/edit/${this.screen._id}`, data)
        .then(resp => {
            if(resp.data.nModified === 1)
            {
              console.log(resp.data);
              this.name = this.screen.name;
              //this.$router.push(`/${this.screen.name}/details`);
              M.toast({html: "The " + this.screen.name + " data was succesfully updated", classes: ' green'});
            }
            else if(resp.data.nModified === 0){
              M.toast({html: "The slide you're trying to add, already exists in this screen", classes: ' yellow'});
            }
            else if(resp.data.ok === 0){
              this.screen.name = this.name;
              M.toast({html: "The name your trying to set already exists <br> Try a different name", classes: ' red'});
            }
            
          
          
          })
        .catch(err => {
          console.log("Wasn't able to perform the request")
          M.toast({html: "There was an error when updating the slide <br> Try reloading the page", classes: ' red'});
          });
    },
    prev(){
      console.log('Previous Slide');  
    },
    next(){
      console.log('Next Slide');
    }

  },
  beforeMount(){
    this.size = this.slides.length;
    this.getDetails();
  }

}
</script>


<style scoped>
  
  div.inner{
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap !important;
  }

  .smallText{
    font-size: 0.7em !important;
  }

  .slide-container {
    height: 40em;
    overflow: hidden;
    overflow-y: auto;
  }

  .setHeight {
    height: 300px;
  }

</style>
