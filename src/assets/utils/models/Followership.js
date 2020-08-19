import Model from "./Model";
import User from "./User"

class Followership extends Model {
    static app_name = 'user'
    static model_name = 'followership'

    constructor({id, following , follower, 
                 following_user_instance,
                 follower_user_instance}) {
        
        super({following , follower})

        this.app_name = 'user'
        this.model = "followership"
        this.pk = id

        // this custom data for followership
        if (following_user_instance != undefined) {
            this.following_user_instance = new User(following_user_instance)
        }
        if (follower_user_instance != undefined) {
            this.follower_user_instance = new User(follower_user_instance)
        }
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
