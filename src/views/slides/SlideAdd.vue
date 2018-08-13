<template lang="pug">
  .container-fluid
    h5.center-align Add Slide
    .row
      .col.s8
        .section
          .row
            .col.s4.input-field
              label Title
              input(type="text" v-model="slide.title")
            .col.s4.input-field
              label.active Order
              input(type="number" v-model="slide.displayOrder")
            .col.s4
              h6 Visible
              .switch
                label
                  | Hide
                  input(type="checkbox", v-model="slide.visible")
                  span.lever
                  | Show
          .row
            .col.s6.input-field
              label.active SubTitle
              input(v-model="slide.subtitle", type="text")
            .col.s3.input-field
              select(v-model="slide.role" @change="changedRole")
                option(disabled, value="") Choose an Option
                option(v-for="role in slideRoles", :value="role") {{role}}
              label.active Slide Role
            .col.s3.input-field(:class="{blur: !(slide.role != 'image' && slide.role != 'local')}")
              label Video Code
              input(type="text", v-model="slide.video", :disabled="!(slide.role != 'image' && slide.role != 'local')")
        .divider
        .section
          .row
            .col.s2
            .col.s6
              h5.center-align.blue-grey-text.text-darken-4.opacity-50 Weekly Schedule
            .col.s4
              button.btn-small.blue.darken-2.white-text.waves-effect.round-border(@click="allDays") All Days
              button.btn-small.indigo.darken-4.white-text.waves-effect.round-border(@click="removeDays") Remove All Days
          .row(v-for="(v,i) in slide.viewSchedule" :key="i")
            .col.s3
              label Day
              select.browser-default(v-model="v.day")
                option(disabled, value="") Choose a Day
                option(v-for="(day, i) in weekdays" :key="i" :value="i") {{day}} 
            .col.s3
              br
              | From: 
              vue-timepicker(:minute-interval="10", hide-clear-button, v-model="v.from", format="HH:mm")
            .col.s3
              br
              | To: 
              vue-timepicker(:minute-interval="10", hide-clear-button, v-model="v.to", format="HH:mm")
            .col.s3
              br
              button.btn-floating.red.darken-4(@click="removeDay(i)")
                i.material-icons remove

          br
          button.btn-floating.btn-large.waves-effect.waves-light.green.left.margin-bottom(@click="addDay")
            i.material-icons add
        button.btn-large.orange.darken-3.z-depth-2.right(@click="submit") Add Slide
      .col.s4
        form(enctype="multipart/form-data")
          .file-field.input-field(v-show="showInput")
            h4.center-align File Upload
            .btn
              span File
              input(type="file", @change="filePreview", ref="myFiles", :accept="inputAccepts")
            .file-path-wrapper
              input.file-path.validate(type="text")
        .preview.round-border(:class="{border: slide.role == 'image'}")
          .holder(v-show="slide.role == 'image'")
            img(:src="slide.image")
    
          


</template>

<script>
import {mapState} from 'vuex';
import VueTimepicker from 'vue2-timepicker';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
const axios = require('axios');
const apiUrl = require('../../assets/variables.js').apiUrl;
const eventBus = require('../../assets/events.js').eventBus;
export default {
  name: 'slide-add',
  components: {
    VueTimepicker: VueTimepicker
  },
  computed: {
    ...mapState(['slideRoles', 'weekdays']),
    showInput(){
      return !(this.slide.role != 'image' && this.slide.role != 'local');
    },
    inputAccepts(){
      if(this.slide.role == 'image')
        return 'image/*';
      else if(this.slide.role == 'local')
        return 'video/*';
    }
  },
  data(){
    return {
      slide: {
        title: '',
        subtitle: '',
        displayOrder: 0,
        role: '',
        image: '',
        video: '',
        viewSchedule: [],
        screens: [],
        visible: true,
        overlayHtml: ''
      },
      img: '',
      video: '',

    };
  },
  methods: {
    allDays(){
      this.slide.viewSchedule = [];
      for(let i = 0; i < this.weekdays.length; i++){
        let obj = {
          day: i,
          active: true,
          from: {
            HH: "00", mm: "00", ss: "00"
          },
          to:{
            HH:23, mm: 59, ss: 59
          },
        };
        this.slide.viewSchedule.push(obj);
      }
    },
    removeDays(){
      this.slide.viewSchedule = []
    },
    addDay(){
      this.slide.viewSchedule.push({
          day: 0,
          active: true,
          from: {
            HH: "00", mm: "00", ss: "00"
          },
          to:{
            HH:23, mm: 59, ss: 59
          },
        })
    },
    removeDay(index){
      this.slide.viewSchedule.splice(index, 1);
    },
    filePreview(){
      console.log('Changed File')
      let reader = new FileReader();
      let files = this.$refs.myFiles.files;
      let val = this.$refs.myFiles.value;
      let file = files[0];
      console.log(val);
      console.log(file);
      if(this.slide.role == 'image'){
        reader.readAsDataURL(file);
        reader.onload = () => {
          //console.log(reader.result);
            this.slide.image = reader.result;
        };
        reader.onerror = (error) => {
          //console.error(error);
        }
      }
    },
    submit(){
      let config = {headers: {'Content-Type': 'multipart/form-data'}};
      let uri  =`${apiUrl}/slides/add`; 
      let data = new FormData();
      let slide = this.slide;
      slide.viewSchedule = JSON.stringify(this.slide.viewSchedule);
      for(let key in slide){
        data.append(key, slide[key]);
      }
      if(slide.role == 'local' || slide.role == 'image') data.append('name', this.slide.title.replace(/\s+/g, ''));
      axios.post(uri, da)
    },
    changedRole(){
      if(this.slide.role == 'image')
        this.slide.video = '';
      else this.slide.image = '';
    }
  },
  mounted(){
    $('select').formSelect();
  }
}
</script>

<style lang="less" scoped>
  .preview{
    width: 100%;
    height: 400px;
    .holder {
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .border {
    border: blue solid 2px;
  }
</style>
