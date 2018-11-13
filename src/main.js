import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import NavMenu from './components/NavMenu'
import VueMarkdown from 'vue-markdown'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(vueQuillEditor) // 富文本编辑器
Vue.config.productionTip = false
Vue.component('nav-menu', NavMenu)
Vue.component('vue-markdown', VueMarkdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
