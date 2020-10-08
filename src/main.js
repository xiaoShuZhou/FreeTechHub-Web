import Vue from 'vue'
import App from './App.vue'
import '@/common/font/font.css'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import filters from './filters/index'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(mavonEditor)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
