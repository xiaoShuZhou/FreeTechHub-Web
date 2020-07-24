import Model from "./Model"
import axios from "axios"
import BASE_URL from '../consts'

class Tag extends Model {
    static app_name = 'tag'
    static model_name = 'tag'

    constructor({id, object_id, tag_name, content_type}) {
        super({object_id, tag_name, content_type})

        // required data fields
        this.app_name = 'tag'
        this.model = "tag"
        this.pk = id

        // this custom data for Tag
        this.tagged_items = null
    }

    // custom methods
    static async _query_tagged_items({type, tag_name}) {
        let res = axios.get(BASE_URL + `${this.app_name}/`+"query/", { 
            params: { type, tag_name }
        })
        let response = await res
        return response.data
    }

    async get_tagged_items() {
        let items
        if (this.tagged_items === null) {
            items = await Tag._query_tagged_items({tag_name: this.tag_name})
            this.tagged_items = items
        } else {
            items = this.tagged_items
        }
        return items
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

export default Tag
