import Model from "./Model";
import marked from 'marked'

class Answer extends Model {
    static app_name = 'question'    // required
    static model_name = 'answer'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, content, time, status, owner, question}) {
        super({content})     // data fields that is requried when save

        // required data fields
        this.app_name = 'question'  // required
        this.model = "answer"      // required
        this.pk = id            // required

        // this custom data for Tag
        this.time = time
        this.status = status
        this.owner = owner
        this.question = question
        this.m_content = marked(this.content)
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

export default Answer
