<template>
    <div class="col s6 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title center-align bolden">{{screen.name}}</span>
              <ul class="collection ">
                <li class="collection-item blue-grey darken-2">Framework: <span class="right colspan-card">{{screen.framework}}</span></li>
                <li class="collection-item blue-grey darken-2">Slides: <span class="right colspan-card">{{screen.slides.length}}</span></li>
              </ul>
              <div v-show="opened"><br></div>
        </div>
        <div class="card-action">
          <router-link :to="{name: 'screen.detail', params: {name: screen.name}}">Details</router-link>
          <a class="activator click-pointer" @click="options">Options</a>
        </div>
        <div class="card-reveal">
          <span class="card-title click-pointer" @click="opened = false">{{sdata.name}} &nbsp; &nbsp; X</span> 
          <div class="row no-bottom-margin">
            <div class="input-field col s6">
              <input type="text" class="autocomplete" v-model="sdata.name" @keyup="setUnsaved">
              <label for="autocomplete-input">Name</label>
            </div>
            <div class="col s6">
               <label>Speed</label>
              <p class="range-field">
                <input type="range" v-model="sdata.speed" min="1000" max="12000" @change="setUnsaved"/>
              </p>
            </div>
          </div>
          <div class="row">
                <div class="col s4">
                  <label>Framework: {{sdata.framework}}</label>
                  <select v-model="sdata.framework" class="browser-default" @change="setUnsaved">
                    <option v-for="(f, key) in frameworks" :key="key" :value="f.title" :disabled="f.disabled">{{f.title}}</option>
                  </select>
                </div>
          </div>


          <transition name="fade">
              <button class="btn waves-effect waves-light red darken-2 right" v-show="unsaved" @click="reset">Reset</button>
          </transition>
          <transition name="fade">
              <button class="btn waves-effect waves-light blue darken-2 right  margin-right" v-show="unsaved" @click="save">Save Changes</button>
          </transition>
          
          
        </div>
      </div>
    </div>
</template>

<script>
const axios = require('axios');
const apiUrl = require('../assets/variables.js').apiUrl;
const eventBus = require('../assets/events.js').eventBus;
export default {
  name: "slide-card",
  props: ['screen', 'frameworks'],
  data(){
    return{
      sdata: {
        name: this.screen.name,
        showControls: this.screen.showControls,
        speed: this.screen.speed,
        framework: this.screen.framework,
        slides: this.screen.slides
      },
      unsaved: false,
      opened: false
    }
  },
  methods: {
    reset(){
      this.sdata = {
        name: this.screen.name,
        showControls: this.screen.showControls,
        speed: this.screen.speed,
        framework: this.screen.framework,
        slides: this.screen.slides
      }
      this.unsaved = false;
    },
    setUnsaved(){
      this.unsaved = true;
    },
    options(){
      this.reset();
      this.opened = true;
    },
    save(){
      let data = {
        name: this.sdata.name,
        showControls: this.sdata.showControls,
        speed: this.sdata.speed,
        framework: this.sdata.framework
      }
      axios.post(`${apiUrl}/screens/edit/${this.screen._id}`, data).then((resp) => {
        console.log(resp.data);
        if(resp.data.ok === 1){
          for(let prop in this.sdata)
          {
            this.screen[prop] = this.sdata[prop]
          }
          this.unsaved = false;
          M.toast({html: "The " + this.screen.name + " data was succesfully updated", classes: ' green'});
        }else {
          M.toast({html: "The name your trying to set already exists <br> Try a different name", classes: ' red'});
          this.reset();
        }
      }).catch((err) => {
        console.log(err);
        M.toast({html: "There was an error while trying to update the Slide", classes: ' red'});
        this.reset();
      })
    }
  },
  mounted(){
    console.log('mounted')


        
  }
}
</script>

<style lang="less">
@import '../assets/main.less';  
  .colspan-card{
    font-weight: bold;
    color: rgb(239, 249, 255);
    font-size: 1.2em;
  }
</style>
