const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
import IndexInterface from './interface/index'
import UserInterface from './interface/user'
import GoodInterface from './interface/good'
import OrderInterface from './interface/order'
import dbConfig from './dbs/config'
import mongoose from 'mongoose'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import passport from './interface/utils/passport'
// import router from 'koa-router'
const bodyParser = require('koa-bodyparser')


const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
app.keys=['emall','keyskeys']
app.use(session({
  store: new Redis()
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser());
app.use(IndexInterface.routes()).use(IndexInterface.allowedMethods())
app.use(UserInterface.routes()).use(UserInterface.allowedMethods())
app.use(GoodInterface.routes()).use(GoodInterface.allowedMethods())
app.use(OrderInterface.routes()).use(OrderInterface.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
