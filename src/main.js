import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Eagle  from 'eagle.js';
  

Vue.config.productionTip = false
Vue.use(Eagle);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

