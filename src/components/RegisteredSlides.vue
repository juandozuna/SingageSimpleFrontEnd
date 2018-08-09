<template>
<div>
  <div class="row margin-top">
      <h4 class="primary-text left">Registered Slides</h4>
      <a class="btn-floating btn-large waves-effect waves-light red right margin-top" style="margin-right: 50px" title="Add Screen"><i class="material-icons">add</i></a>
    </div>
    <div class="row">
      <slide-card v-for="(slide, key) in slides" :key="key" colSize="s2" :slide="slide" @updated="sort"></slide-card>
    </div>
</div>

</template>


<script>
import SlideCard from '@/components/SlideCard.vue';
import Axios from 'axios';
const apiUrl = require('../assets/variables.js').apiUrl;

export default {
  name: 'registered-slides',
  components: {
    SlideCard: SlideCard
  },
  data(){
    return{
      slides: [],
      slidesSorted: []
    };
  },
  computed: {
    sortedSlides(){
      return this.slides.concat().sort((a,b) => {
        return a-b;
      });
    }
  },
  methods: {
    getAllSlides(){
      Axios.get(`${apiUrl}/slides`)
        .then( resp => {
          console.log('Slides All');
          console.log(resp);
          this.slides = resp.data;
        })
        .catch(err => console.log(err));
    },
    sort(){
      //this.getAllSlides();
    }
  },
  beforeMount(){
    this.getAllSlides();
  }
}
</script>
