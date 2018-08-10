import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Eagle  from 'eagle.js';
import store from './store'


Vue.config.productionTip = false
Vue.use(Eagle);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

