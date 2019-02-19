import Router from 'koa-router'
import User from '../dbs/models/user'
import Goods from '../dbs/models/goods'
import fs from 'fs'
import mongoose from 'mongoose'

const router = new Router({
  prefix: '/emall'
})


export default router