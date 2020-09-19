const PRODUCTION = false

let BASE_URL
export let PORT = PRODUCTION ? '80' : '8080'
export let IP = PRODUCTION ? '115.29.242.221' : '127.0.0.1'
if (PRODUCTION) {
    BASE_URL = `http://${IP}:8002/`
} else {
    BASE_URL = `http://${IP}:8000/`
}
export default BASE_URL
export let DOMAIN = BASE_URL.substr(7, 19)
