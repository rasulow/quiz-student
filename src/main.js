import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
// import is_have from './utils/haveToken'




Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const token = 'Bearer ' + localStorage.getItem('token')
axios.defaults.headers['Authorization'] = token
// if (is_have()) {
// }


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
