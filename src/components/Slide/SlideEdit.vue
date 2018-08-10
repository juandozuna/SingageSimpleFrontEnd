<template lang="pug">
  .container-fluid
    .section
      .row
        .col.s4.input-field
          label.active Title
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
        .col.s6
          label Slide Role
          select.browser-default(v-model="slide.role", disabled)
            option(disabled, value="") Choose an Option
            option(v-for="role in slideRoles", :value="role") {{role}}
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


      
          
</template>

<script>
import {mapState} from 'vuex';
import VueTimepicker from 'vue2-timepicker';
const apiUrl = require('../../assets/variables.js').apiUrl;
const eventBus = require('../../assets/events.js').eventBus;
export default {
  name: 'slide-edit',
  props: {
    slide: {
      required: true
    }
  },
  components: {
    VueTimepicker: VueTimepicker
  },
  computed: {
    ...mapState(['slideRoles', 'weekdays'])

  },
  data(){
    return {

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
    }
  }
}
</script>
