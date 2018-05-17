import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/fontawesome/less/fa-solid.less'
import './assets/fontawesome/less/fontawesome.less'

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
