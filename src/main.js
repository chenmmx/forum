import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import NavMenu from './components/NavMenu'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.component('nav-menu', NavMenu)
Vue.component(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
