<template lang="pug">
  div
    .row.no-bottom-margin
      .col.s2
      .col.s8
        h4.center-align.no-top-margin Details
      .col.s2
        button.red.darken-2.white-text.round-border.btn.waves-effect.waves-light(@click="erase") Delete
    .row.z-depth-3.blue.lighten-4.round-border
      .col.s3.blue.lighten-4.round-border-left
        h4.padding-sides.blue-grey-text.text-darken-1 Title:   
          span.blue.lighten-3.padding-sides.round-border.black-text {{slide.title}}
        hr
        h5.blue-grey-text.text-darken-2 Subtitle
        p {{slide.subtitle}}
        hr
        h5.left.blue-grey-text.text-darken-2 Role
        p.left.margin-left {{slide.role}}
      .col.s9.blue-grey.lighten-5.round-border-right.no-padding
        ul.tabs.blue.lighten-4
            li.tab.col.s4 
              a(href="#edit") Edit
            li.tab.col.s4
              a(href="#editor") Slide Editor
            li.tab.col.s4
              a(href="#preview") preview
        .col.s12#edit
          slide-edit(:slide="slide")
        .col.s12#editor
          slide-builder
        .col.s12#preview
          //slide-preview(:slide="slide" width="100%" height="400px")
            

    .row
      .col.s6
        h4.red-text.text-darken-2 Added Slides
        transition-group(name="fade")
          screen-card(v-for="(screen, key) in screens", :key="key", :screen="screen", :deleteable="true", :slide="slide", @removed="removed(screen)")
      
    

</template>


<script>
import SlideEdit from '../../components/Slide/SlideEdit';
import SlidePreview from '../../components/Slide/SlidePreview';
import SlideBuilder from '../../components/Slide/SlideBuilder';
const apiUrl = require('../../assets/variables.js').apiUrl;
import axios from 'axios';
import ScreenCard from '../../components/ScreenCard';
export default {
  name: 'slide-details',
  components: {
    ScreenCard: ScreenCard,
    SlideEdit: SlideEdit,
    SlidePreview: SlidePreview,
    SlideBuilder: SlideBuilder
  },
  data(){
    return {
      slide: '',
      screens: [],
      id: this.$route.params.id
    };
  },
  methods: {
    get(){
      let uri = `${apiUrl}/slides/single/${this.$route.params.id}`;
      console.log('uri: ' + uri);
      axios.get(uri)
        .then(resp => {
          console.log(resp);
          this.slide = resp.data.slide;
          this.screens = resp.data.screens;
        })
        .catch(err => {
          M.toast({html: 'it was not possible to load slide', classes: 'red darken-2 white-text'});
        })
      
    },
    removed(screen){
      let index = this.screens.indexOf(screen);
      if(index > -1){
        this.screens.splice(index, 1);
      }
    },
    erase(){
      let uri = `${apiUrl}/slides/delete/${this.slide._id}`;
      let answer = confirm("Are you sure you want to delete this slide");
      if(answer){
        axios.delete(uri)
          .then(resp => {
            this.$route.push({name: 'home'});
            M.toast({html: "Slide was deleted Succesfully"});
            
          })
          .catch(err => {
           // M.toast({html: "There was an error while deleting the slide", classes: "red darken-2"});
          })
          this.$route.push({name: 'home'});
          M.toast({html: "Slide was deleted Succesfully"});
      }
      else M.toast({html: "No changes ocurred", classes: "blue lighten-3 blue-grey-text darken-6"})
    }
  },
  mounted(){
    this.get();
    $('.tabs').tabs();
  }
}
</script>
