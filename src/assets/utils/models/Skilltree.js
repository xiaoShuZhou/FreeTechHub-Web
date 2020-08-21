import Model from "./Model"
import axios from "axios"
import BASE_URL from '../consts'

class Skilltree extends Model {
    static app_name = 'skilltree'
    static model_name = 'skilltree'

    constructor({id, name, is_under_changing, last_modified, root_node}) {
        super({is_under_changing, root_node})

        // required data fields
        this.app_name = 'skilltree'
        this.model = "skilltree"
        this.pk = id

        // this custom data for Series
        this.name = name
        this.last_modified = last_modified
    }

    // custom methods
    async get_tree() {
        let res = await axios.get(BASE_URL+`${this.app_name}/getskilltree/${this.pk}/`)
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

export default Skilltree
