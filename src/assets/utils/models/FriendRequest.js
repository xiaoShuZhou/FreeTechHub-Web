import Model from "./Model";
import User from "./User"

class FriendRequest extends Model {
    static app_name = 'user'
    static model_name = 'friendrequest'

    constructor({id, sender_instance, receiver_instance,
                datetime, note, state, sender, receiver}) {
        super({note, state, sender, receiver})

        this.app_name = 'user'
        this.model = "friendrequest"
        this.pk = id

        // this custom data for FriendRequest
        if (sender_instance != undefined) {
            this.sender_instance = new User(sender_instance)
        }
        if (receiver_instance != undefined) {
            this.receiver_instance = new User(receiver_instance)
        }
        this.datetime = datetime
    }

    // FriendRequest custom methods
    getState() {
        let map = {
            'A': 'approved',
            'D': 'denied',
            'C': 'canceled',
            'W': 'waiting',
        }
        return map[this.state]
    }

    deny() {
        this.state = "D"
        this.update()
    }

    accept() {
        this.state = "A"
        this.update()
    }

    cancel() {
        this.state = "C"
        this.update()
    }

    // get model by id
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    // get all the model
    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default FriendRequest
