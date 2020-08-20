import Model from "./Model";
import axios from "axios"
import User from "./User"
import BASE_URL from '../consts'

class Friendship extends Model {
    static app_name = 'user'
    static model_name = 'friendship'

    constructor({id, friend_instance_1, friend_instance_2, friend_1, friend_2 }) {
        super({friend_1, friend_2})

        this.app_name = 'user'
        this.model = "friendship"
        this.pk = id

        // this custom data for Friendship
        if (friend_instance_1 != undefined) {
            this.friend_instance_1 = new User(friend_instance_1)
        }
        if (friend_instance_2 != undefined) {
            this.friend_instance_2 = new User(friend_instance_2)
        }
    }

    //get related friendslist
    static async getFriendlist() {
        let res = await axios.get(BASE_URL+'user/getfriendlists/')
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

export default Friendship
