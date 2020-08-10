import Model from "./Model";
import axios from "axios"

class Friendship extends Model {
    static app_name = 'user'
    static model_name = 'friendship'

    constructor({id, friend_1, friend_2 }) {
        super({friend_1, friend_2})

        this.app_name = 'user'
        this.model = "friendship"
        this.pk = id

        // this custom data for followership
        this.friend_1= friend_1
        this.friend_2 = friend_2
        this.friendlists = []

    }

    //get related friendslist
    static async getFriendlist() {
        let res = await axios.get('http://127.0.0.1:8000/user/getfriendlists/')
        this.friendlists = res.data
        return this.friendlists
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
