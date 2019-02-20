// import { resolve } from 'path'
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  layoutTransition: 'login',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/stylus/reset.css',
    '@/assets/stylus/main.styl',
    '@/assets/stylus/border.css',
    '@/assets/iconfont/iconfont.css',
    { src: "swiper/dist/css/swiper.css" }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vant",
    "@/plugins/vue-lazyload"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
 build: {
  productionSourceMap:false,
  extend (config, ctx) {
    if (ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
  // assetsPublicPath: './'
  // babel: {
  //   presets: ['es2015', 'stage-0']
  // }
}
}
