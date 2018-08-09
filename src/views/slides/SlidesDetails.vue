<template lang="pug">
  div
    h4.center-align.no-top-margin Details
    .row
      .col.s3.blue.lighten-5.round-border.z-depth-3
        h4.padding-sides.blue-grey-text.text-darken-1.round-border Title   
          span.blue.lighten-3.padding-sides.round-border.black-text {{slide.title}}
        hr
        h5.blue-grey-text.text-darken-2 Subtitle
        p {{slide.subtitle}}
        hr
        h5.left.blue-grey-text.text-darken-2 Role
        p.left.margin-left {{slide.role}}

</template>


<script>
const apiUrl = require('../../assets/variables.js').apiUrl;
import axios from 'axios';
export default {
  name: 'slide-details',
  data(){
    return {
      slide: '',
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
          this.slide = resp.data;
        })
        .catch(err => {
          M.toast({html: 'it was not possible to load slide', classes: 'red darken-2 white-text'})
        })
      
    }
  },
  created(){
    this.get();
  }
}
</script>
