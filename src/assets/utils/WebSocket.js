import {DOMAIN} from '@/assets/utils/consts'

class Websocket extends WebSocket {
    constructor(user_id) {
        super('ws://' + DOMAIN + '/ws/')
        this.onopen = () => {
            this.register(user_id)
        }
        this.onmessage = (event) => {
            this.on_receive_json(event)
        }
        this.callbacks = []
        this.callers = []
    }

    register(user_id) {
        let msg = JSON.stringify({
            register: true,
            sender_id : user_id,
        })
        this.send(msg)
    }

    send_json(msg) {
        let msg = JSON.stringify(msg)
        this.websocket.send(msg)
    }

    add_callback(name, callback) {
        for (let caller of this.callers) {
            if (caller == name) return
        }
        this.callbacks.push(callback)
    }

    on_receive_json(event) {
        let msg = JSON.parse(event.data)
        for (let callback of this.callbacks) {
            callback(msg)
        }
    }
}

export default Websocket