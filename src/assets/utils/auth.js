import axios from 'axios';
import BASE_URL from './consts';
import User from './models/User'

axios.defaults.headers['Authorization'] = localStorage.getItem('token')

export async function login(username, password) {
  let res = await axios.post(BASE_URL + 'api-token-auth/', {
    username: username,
    password: password
  })
  axios.defaults.headers['Authorization'] = 'JWT ' + res.data.token
  localStorage.setItem("token", 'JWT ' + res.data.token);
  return await User.getSelf()
}

export function logout() {
  delete axios.defaults.headers.Authorization
  localStorage.removeItem('token')
}

export async function is_authenticated(vm) {
  // if there is no token, user is not loggd in
  if (localStorage.getItem('token') == null) {
    return false
  } 
  else {
    // if there is a token, check if it's expired.
    try {
      let user = await User.getSelf()

      // Update the user in the Vuex
      if (vm != undefined) {
        vm.$store.commit('setUser', user)
      }
      return true
    } 
    catch(err) {
        // the token is expired
        localStorage.removeItem('token')
        delete axios.defaults.headers.Authorization
        return false
    }
  }
}

export async function login_required(vm, callBack) {
  let res = await is_authenticated(vm)
  if (res == true) {
    if(callBack != undefined) {
      callBack(vm.$store.state.user)
    }
  } else {
    vm.$router.push({name: 'Login'})
  }
}
