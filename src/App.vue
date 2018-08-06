<template>
  <div id="app">
    <navbar></navbar>
    <div class="fixed right">
      <transition-group name="fade">
        <div v-for="(alert, key) in alerts" :key="key" >
          <div class="alert round-border" :class="alert.type" v-html="alert.message"></div>
        </div>
      </transition-group>
      
    </div>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
const eventBus = require('./assets/events.js').eventBus;
export default {
  name: 'app',
  components: {
    Navbar: Navbar
  },
  data(){
    return {
      alerts: []
    };
  },
  methods: {
    success(message){
      let obj = {
        type: 'success',
        message: message
      };
      this.alerts.push(obj);
      this.restore(obj);
    },
    warning(message){
      let obj = {
        type: 'warning',
        message: message
      };
      this.alerts.push(obj);
      this.restore(obj);
    },
    danger(message){
      let obj = {
        type: 'danger',
        message: message
      };
      this.alerts.push(obj);
      this.restore(obj);
    },
    default(message){
      let obj = {
        type: '',
        message: message
      };
      this.alerts.push(obj);
      this.restore(obj);
    },
    restore(obj){
      let index = this.alerts.indexOf(obj);
      if(index > -1){
        setTimeout(() => {
          this.alerts.splice(0, 1);
        }, 3500);
        
      }
      
    }
  },
  created(){
    eventBus.$on('success alert', this.success);
    eventBus.$on('warning alert', this.warning);
    eventBus.$on('danger alert', this.danger);
    eventBus.$on('default alert', this.default);
  }

}
</script>



<style lang="less">

</style>
