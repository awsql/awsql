import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free-webfonts/less/fontawesome.less'
import '@fortawesome/fontawesome-free-webfonts/less/fa-solid.less'
import '@fortawesome/fontawesome-free-webfonts/less/fa-brands.less'

import * as keyValue from './services/keyValue'
import App from './App.vue'
// import router from './router'
import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  // router,
  store,
  async created () {
    const credentials = await keyValue.get('credentials')
    this.$store.commit('setCredentials', credentials)
  },
  render: h => h(App)
}).$mount('#app')
