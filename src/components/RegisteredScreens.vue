<template>
   <div>
     <h4 class="primary-text">Registered Screens</h4>
     <screen-card v-for="(s, i) in screens" :key="i" :screen="s" :frameworks="frameworks"></screen-card>
   </div>
</template>


<script>
import ScreenCard from '@/components/ScreenCard.vue';

import Axios from 'axios';
const apiUrl = require('../assets/variables.js').apiUrl;
const axios = require('axios');
export default {
  name: 'registered-screens',
  data(){
    return{
      screens: [],
      frameworks: []
    };
  },
  components: {
    ScreenCard: ScreenCard
  },
  methods: {
    getAllScreens(){
      Axios.get(`${apiUrl}/frameworks/screens`)
        .then((resp) => {
          console.log(resp);
          this.screens = resp.data.screens;
          this.frameworks = resp.data.frameworks;
        });
    }
  },
  created() {
    this.getAllScreens();

  }

}
</script>
