import Router from 'koa-router'
import UserModel from '../dbs/models/user'
import AddressModel from '../dbs/models/address'
import OrderModel from '../dbs/models/order'
import Redis from 'koa-redis'

const Store = new Redis().client
const router = new Router({
  prefix: '/order'
})

router.get('/getUserAddress', async(ctx ,next) => {
  try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let username = ctx.session.passport.user.username
    let userId = await Store.hget('usersData', username)
    if(!userId) {
      let user = await UserModel.findOne({username})
      userId = user.id
    }
    let result = await AddressModel.find({userId})
    ctx.body= {
      code: 0,
      addressList: result
    }
  } catch (error) {
    ctx.body= {
      code: 500,
      msg: error
    }    
  }
})

router.post('/updateAddress', async (ctx, next) => {
  try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let username = ctx.session.passport.user.username
    let userId = await Store.hget('usersData', username)
    if(!userId) {
      let user = await UserModel.findOne({username})
      userId = user.id
    }
    const {addressDetail,
      areaCode,city,country,
      county,isDefault,
      name,postalCode,province,tel,id}
      = ctx.request.body
    let addressObj = {address: addressDetail,addressDetail,areaCode,city,
      country,county,isDefault,name,postalCode,province,tel,userId,id}
    let result = await AddressModel.find({
      userId, id
    }).update(addressObj)
    ctx.body = {
      code: 0,
      data: '修改成功'
    }
  } catch (error) {
    ctx.body= {
      code: 500,
      msg: error
    }    
  }
})

router.post('/createOrder', async(ctx, next) => {
  try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let username = ctx.session.passport.user.username
    let userId = await Store.hget('usersData', username)
    if(!userId) {
      let user = await UserModel.findOne({username})
      userId = user.id
    }
    let orderId = Math.random().toString().slice(3,15)
    let {selectedAddress, goodsList} = JSON.parse(ctx.request.body.data)
    goodsList.forEach(async (item) => {
      let itemObj = {
        address: selectedAddress.addressDetail,
        userId,
        orderId,
        goodName: item.name,
        goodImage: item.image,
        count: item.count,
        price: item.price
      }
      let newOrder = new OrderModel(itemObj)
      await newOrder.save()
    })
    ctx.body={
      code: 0,
      msg: '订单已保存'
    }
  } catch (error) {
    ctx.body={
      code: 500,
      msg: error
    }
  }
})


router.post('/deleteAddress', async(ctx, next) => {
  // try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let {userId, id} = ctx.request.body
    await AddressModel.findOne({
      userId,
      id
    }).remove()
    let result = await AddressModel.find({
      userId
    })
    let len = result.length
    if(len >0) {
      for (let index = 0; index < len; index++) {
        let addId = result[index].id
        await AddressModel.update({userId,id:addId},{$set:{id:index}})
      }
    }

    ctx.body={
      code: 0,
      msg: '地址已删除'
    }
  // } catch (error) {
    // ctx.body={
      // code: 500
      // error
    // }
  // }
})

router.get('/getOrderList', async (ctx,next) => {
  try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let username = ctx.session.passport.user.username
    let userId = await Store.hget('usersData', username)
    if(!userId) {
      let user = await UserModel.findOne({username})
      userId = user.id
    }
    let result = await OrderModel.find({userId})
    ctx.body = {
      code: 0,
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      error
    }
  }
})


router.post('/createAddress', async (ctx, next) => {
  try {
    if(JSON.stringify(ctx.session.passport) == '{}') {
      ctx.body= {
        code: 10,
        msg: '请先登录!'
      }
      return
    }
    let username = ctx.session.passport.user.username
    // 获取用户id
    let userId = await Store.hget('usersData', username)
    if(!userId) {
      let user = await UserModel.findOne({username})
      userId = user.id
    }
    //计算用户的address有多少个
    let result = await AddressModel.find({userId})
    let addressId = result.length
    if(result.length >= 4) {
      ctx.body= {
        code: 0,
        msg: '地址最多保存4条'
      }
      return
    }
    const {addressDetail,
          areaCode,city,country,
          county,isDefault,
          name,postalCode,province,tel}
          = ctx.request.body
    let addressObj = {address: addressDetail,addressDetail,areaCode,city,
      country,county,isDefault,name,postalCode,province,tel,userId,id: addressId}
    let newAddress = new AddressModel(addressObj)
    await newAddress.save() 
    ctx.body= {
      code: 0,
      msg: '地址已保存'
    }
  } catch (error) {
    ctx.body= {
      code: 500,
      msg: error
    }
  }

})

export default router