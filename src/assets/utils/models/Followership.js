import Model from "./Model";


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
