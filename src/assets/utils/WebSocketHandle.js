import {DOMAIN} from '@/assets/utils/consts'

class WebSocketHandle {
    constructor(user_id) {
        this._socket = new WebSocket('ws://' + DOMAIN + '/ws/')
        this._socket.onopen = () => {
            this.register(user_id)
        }
        this._socket.onmessage = (event) => {
            this.on_receive_json(event)
        }
        this.callbacks = []
        this.callers = []
    }

    static createSocketIfNotExist(vm, user_id) {
        if (vm.$store.state.socketHandle == '') {
            vm.$store.commit("setSocketHandle", new WebSocketHandle(user_id))
        }
    }

    register(user_id) {
        let msg = JSON.stringify({
            register: true,
            sender_id : user_id,
        })
        this._socket.send(msg)
    }

    send_json(msg) {
        msg = JSON.stringify(msg)
        this._socket.send(msg)
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

export default WebSocketHandle