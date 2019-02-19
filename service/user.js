import axios from 'axios'
import CryptoJS from 'crypto-js'

const User = {
  _checkUser(username) {
    return axios.get(`/users/checkUser?username=${username}`)
  },
  _doLogin(username, password) {
    return axios.post('/users/signin', {
      username:window.encodeURIComponent(username),
      password:CryptoJS.MD5(password).toString()
    })
  },
  _getUser() {
    return axios.get('/users/getUser')
  },
  _logout() {
    return axios.get('/users/exit')
  },
  _register(username,password,phone,verifyCode) {
    return axios.post('/users/register', {
      username:window.encodeURIComponent(username),
      password:CryptoJS.MD5(password).toString(),
      phone,
      verifyCode
    })
  },
  _sednMsg(phoneNum) {
    return axios.get(`/users/sendMsg?phone=${phoneNum}`)
  },
  _checkLogin() {
    return axios.get('/users/checkLogin')
  },
  _passwordUpdate(data) {
    return axios.post('/users/passwordUpdate', data)
  }
}

export default User
