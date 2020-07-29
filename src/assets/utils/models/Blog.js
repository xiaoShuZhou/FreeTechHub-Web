import Model from "./Model"
import Tag from "./Tag"
import marked from 'marked'

class Blog extends Model {
    static app_name = 'blog'    // required
    static model_name = 'blog'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, title, content, date, viewTimes, owner, tags}) {
        super({title, content, owner})     // data fields that is requried when save
        // required data fields
        this.app_name = 'blog'  // required
        this.model = "blog"      // required
        this.pk = id            // required

        // this custom data for Tag
        this.date = date
        this.viewTimes = viewTimes
        this.owner = owner
        this.m_content = marked(this.content)

        if (tags != undefined) {
            this.tags = []
            tags.forEach(tag => { this.tags.push(new Tag(tag)) })
        }
    }

    // -*- Just copy paste everything below to every concrete model -*-

    // They can not be defined inside of Model super class because
    // I can't get the constructors of these concrete models from 
    // the Model super class. If you know how, plase let me know.

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
