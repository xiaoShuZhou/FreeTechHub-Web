import Model from "./Model";
import marked from 'marked'
import Tag from "./Tag"
import Answer from './Answer'
import User from './User'

class Question extends Model {
    static app_name = 'question'     
    static model_name = 'question'   

    constructor({id, title, content, date, bounty, viewTimes, status, owner, owner_instance, tags, answers}) {
        super({title, content, bounty, owner, status})

        this.app_name = 'question'  
        this.model = "question"     
        this.pk = id                

        this.date = date
        this.viewTimes = viewTimes
        if (owner_instance != undefined) {
            this.owner_instance = new User(owner_instance)
        }
        this.m_content = marked(this.content)
 
        if (tags != undefined) {
            this.tags = []
            tags.forEach(tag => { this.tags.push(new Tag(tag)) })
        }
        if (answers != undefined) {
            this.answers = []
            answers.forEach(answer => { this.answers.push(new Answer(answer)) })
        }
    }

    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default Question
