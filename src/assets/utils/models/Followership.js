import Model from "./Model";
import axios from "axios"

class Followership extends Model {
    static app_name = 'user'
    static model_name = 'followership'

    constructor({id, following , follower }) {
        super({following , follower})

        this.app_name = 'user'
        this.model = "followership"
        this.pk = id

        // this custom data for followership
        this.following = following
        this.follower=  follower
        this.followings = []
        this.followers = []
    }

    //Followership custom methods
    static async getFollowinglist() {
        let res = await axios.get('http://127.0.0.1:8000/user/getfollowing/')
        this.followings = res.data.data
        return this.followings
    }

    static async getFollowerlist() {
        let res = await axios.get('http://127.0.0.1:8000/user/getfollower/')
        this.followers = res.data.data
        return this.followers
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

export default Followership
