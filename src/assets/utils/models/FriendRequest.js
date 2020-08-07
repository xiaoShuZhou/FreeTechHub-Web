import Model from "./Model";
import axios from "axios"

class FriendRequest extends Model {
    static app_name = 'user'
    static model_name = 'friendrequest'

    constructor({id, to_user, from_user, timestamp,
        request_message, is_cancel }) {
        super({to_user, from_user,  request_message, is_cancel})

        this.app_name = 'user'
        this.model = "friendrequest"
        this.pk = id

        // this custom data for followership
        this.to_user = to_user
        this.from_user = from_user
        this.timestamp = timestamp
        this.request_message = request_message
        this.is_cancel = is_cancel

        this.Requestlist = []


    }

    // FriendRequest custom methods
    static async getRequestlist() {
        let res = await axios.get('http://127.0.0.1:8000/user/getrequest/')
        this.Requestlist = res.data
        return this.Requestlist
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
