import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import routes from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import paginate from 'vuejs-paginate'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(swal)
Vue.use(Vuelidate)
Vue.prototype.$log = console.log.bind(console)

Vue.use(paginate)



axios.defaults.baseURL = 'http://localhost:8000/api/admin'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


new Vue({
  el: '#app',
  router: routes,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
