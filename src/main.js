import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'

import '@/icons' // icon
import '@/permission' // permission control
import infiniteScroll from "vue-infinite-scroll";



Vue.use(ElementUI, { 
  locale,
  i18n: (key, value) => i18n.t(key, value)})
Vue.use(infiniteScroll);


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
