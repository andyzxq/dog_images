import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

/*import global css*/
import './assets/css/global.css'
import './assets/css/dog_image.css'

import errorImg from './assets/static/img/unload.jpg'
import loadingImg from './assets/static/img/unload.jpg'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
