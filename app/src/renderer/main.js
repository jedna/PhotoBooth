import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import store from './store'

import VueLazyload from 'vue-lazyload'

import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(Electron)
Vue.use(Router)
Vue.use(VueLazyload, {
    loading: require('components/BrowserView/assets/placeholder.jpg')
})
Vue.config.debug = true

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    ...App
}).$mount('#app')
