const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {type:String},
    address: {type: String},
    orderId:{type:String},
    goodName:{type:String}, 
    goodImage:{type:String},
    count:{type:Number},
    price:{type:Number}
})
export default mongoose.model('Order',orderSchema)