import Model from "./Model";
import User from "./User"
import axios from "axios"
import BASE_URL from "../consts"

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
        this.sender_instance = new User(sender_instance)
        this.receiver_instance = new User(receiver_instance)
        this.datetime = datetime
    }

    // FriendRequest custom methods
    static async getRequestlist() {
        let res = await axios.get(BASE_URL+'user/getrequest/')
        return res.data
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
