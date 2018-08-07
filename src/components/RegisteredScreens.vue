<template>
   <div>
     <div class="row">
       <h4 class="primary-text left">Registered Screens</h4>
        <router-link :to="{name: 'screen.add'}" class="btn-floating btn-large waves-effect waves-light red right margin-top"
         style="margin-right: 50px" title="Add Screen"><i class="material-icons">add</i>
         </router-link>
     </div>
     <div class="row">
        <screen-card v-for="(s, i) in screens" :key="i" :screen="s" :frameworks="frameworks"></screen-card>
     </div>
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
