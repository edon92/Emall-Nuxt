import axios from 'axios'

const Order = {
  _getAddress() {
    return axios.get('/order/getUserAddress')
  },
  _createAddress(address) {
    return axios.post('/order/createAddress',address)
  },
  _updateAddress(address) {
    return axios.post('/order/updateAddress',address)
  },
  _createOrder(cartInfo) {
    return axios.post('/order/createOrder', {
      data: cartInfo
    })
  },
  _getOrderList() {
    return axios.get('/order/getOrderList')
  },
  _deledtAddress(data) {
    return axios.post('/order/deleteAddress',data)
  }
}



export default Order
