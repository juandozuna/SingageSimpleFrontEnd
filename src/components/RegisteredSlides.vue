<template>
<div>
  <h4 class="primary-text">Registered Slides</h4>
  <slide-card v-for="(slide, key) in slides" :key="key" colSize="s2" :slide="slide"></slide-card>
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
      slides: []
    };
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
    }
  },
  beforeMount(){
    this.getAllSlides();
  }
}
</script>
