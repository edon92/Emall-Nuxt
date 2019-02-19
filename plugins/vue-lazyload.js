import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

// Vue.use(VueLazyLoad)

let main = {
  install(Vue) {
    Vue.use(VueLazyLoad,{
      preLoad: 1.3,
      error: require('../assets/images/logo.png'),
      loading: require('../assets/images/logo.png'),
      attempt: 1
    })
  }
}

Vue.use(main)