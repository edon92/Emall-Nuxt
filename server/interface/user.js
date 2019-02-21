import Router from 'koa-router'
import User from '../dbs/models/user'
import Redis from 'koa-redis'
import Passport from './utils/passport'
import axios from 'axios'
import Msg from '../dbs/config'
import sha1 from 'sha1'

const Store = new Redis().client
const router = new Router({
  prefix: '/users'
})

router.post('/register', async (ctx, next) => {
  let {username, password, phone, verifyCode} = ctx.request.body
  let id = Math.random().toString(16).slice(2,15)
  const numb = await Store.hget('phonemsg', phone)
  Store.hset('usersData', username , id)
  if(verifyCode !== numb) {
    ctx.body = {
      code: -1,
      msg: '验证码错误'
    }
    return
  }
  let newUser = new User({
    username,
    password,
    phone,
    id
  })
  await newUser.save()
  ctx.body = {
    code: 0,
    msg: '注册成功'
  }
})

router.get('/ttt', async(ctx, next) => {
  let username = ctx.request.query.username
  const numb = await Store.hget('usersData', username)
  ctx.body= {
    code: 0,
    id: numb
  }
})


router.get('/checkUser', async (ctx, next) => {
  let username = ctx.request.query.username
  let res = await User.findOne({username})
  const msg = ''
  if (!!res) {
    ctx.body= {
      code: 0,
      msg: '用户名已经被注册'
    }
    return
  }
  ctx.body= {
    code: 0
  }
})

router.get('/checkLogin',async (ctx, next) => {
  try {
    if(ctx.session.passport.user == undefined) {
      ctx.body= {
        code: 10,
        msg: '请先登录',
        isLogin: false
      }
    }else {
      ctx.body= {
        code: 0,
        msg: '已登录',
        isLogin: true
      }
    }
  } catch (error) {
    ctx.body= {
      code: 500,
      msg: error
    }
  }
})

router.get('/sendMsg', async (ctx, next) =>  {
  const APP_KEY = '0e12f694da833708628abfbda76513e7'
  const APP_SECRET = '639ae5f5eb3d'
  const NONCE = 'edon'
  const time = new Date(); 
  const CurTime = time.getTime(); 
  const CheckSum = sha1(APP_SECRET + NONCE + CurTime); 
  let ko = {
    expire: Msg.mvc.expired(),
    phone: ctx.request.query.phone
  }
  const saveExpire = await Store.hget('phonemsg', 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  await axios({
    url: `https://api.netease.im/sms/sendcode.action?&mobile=${ko.phone}`,
    method: 'post',
    headers: {
      'AppKey':APP_KEY, 
      'Nonce':NONCE, 
      'CurTime':CurTime, 
      'CheckSum':CheckSum, 
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
    }
  }).then(async res => {
    console.log(res)
    const st = await Store.hset('phonemsg', ko.phone, res.data.obj, 'expire', ko.expire)
  })
  const numb = await Store.hget('phonemsg', ko.phone)
  ctx.body= {
    code: 0,
    verifyCode: numb,
    msg: '已经成功发送验证码'
  }
})

// router.get('/redis', async (ctx,next) => {
//   await Store.hset('phonemsg', 13924844793, 4146, 'expire', 600)
//   ctx.body= {
//     code:0
//   }
// })

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功'
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '登出成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登出失败，请稍后重试'
    }
  }
})

router.get('/getUser', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const {username} = ctx.session.passport.user
    let result = await User.findOne({username})
    ctx.body={
      code: 0,
      user:username,
      phone: result.phone
    }
  }else{
    ctx.body={
      code: -1,
      user:''
    }
  }
})

export default router