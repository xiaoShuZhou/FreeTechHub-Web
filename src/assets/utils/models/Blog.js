import Model from "./Model"
import Tag from "./Tag"
import marked from 'marked'

class Blog extends Model {
    static app_name = 'blog'
    static model_name = 'blog'

    // the input argument must be something like:
    constructor({id, title, content, date, viewTimes, owner, tags, series}) {
        super({title, content, owner, viewTimes, series})  // data fields that is requried when save
        // required data fields
        this.app_name = 'blog'
        this.model = "blog"
        this.pk = id

        // this custom data for Blog
        this.date = date
        this.owner = owner
        this.m_content = marked(this.content)

        if (tags != undefined) {
            this.tags = []
            tags.forEach(tag => { this.tags.push(new Tag(tag)) })
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

export default Blog
