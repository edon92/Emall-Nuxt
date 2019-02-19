import mongoose from 'mongoose'
const Schema = mongoose.Schema
const AddressSchema = new Schema( {
  address: {
    type: String,
  }, 
  addressDetail: {
    type: String,
  },
  areaCode:{
    type: String
  },
  city:{
    type: String
  },  
  country:{
    type: String
  }, 
  county:{
    type: String
  }, 
  id:{
    type: Number,
    require:true
  }, 
  userId: {
    type: String
  },
  isDefault:{
    type: Boolean,
  }, 
  name:{
    type: String
  }, 
  postalCode:{
    type: String
  }, 
  province: {
    type: String
  }, 
  tel:{
    type: String
  }, 
})

export default mongoose.model('Adress', AddressSchema)
