import axios from 'axios';
import BASE_URL from './consts';
import User from '@/assets/utils/models/User'

axios.defaults.headers['Authorization'] = localStorage.getItem('token')

export async function login(username, password) {
    let res = await axios.post(BASE_URL + 'api-token-auth/', {
        username: username,
        password: password
    })
    axios.defaults.headers['Authorization'] = 'JWT ' + res.data.token
    localStorage.setItem("token", 'JWT ' + res.data.token);
}

export function logout() {
    axios.defaults.headers['Authorization'] = ''
    localStorage.removeItem('token')
}

export async function is_authenticated(vm) {
    // if there is no token, user is not loggd in
    if (localStorage.getItem('token') == null) {
        return false
    } else {
        // if there is a token, check if it's expired.
        try {
            let self = await axios.get('http://127.0.0.1:8000/user/getself/')
            // if the token is not expired, set the globle user to the returned data
            vm.$user = new User(self.data)
            return true
        } catch(err) {
            // the token is expired
            localStorage.removeItem('token')
            return false
        }
    }

}
