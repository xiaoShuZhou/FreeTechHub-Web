import axios from 'axios';
import BASE_URL from './consts';

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

export function is_authenticated() {
    return !(localStorage.getItem('token') == null ||
             localStorage.getItem('token') == '')
}
