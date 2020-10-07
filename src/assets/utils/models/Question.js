import Model from "./Model";
import marked from 'marked'
import Tag from "./Tag"
import Answer from './Answer'
import User from './User'
import axios from 'axios'
import BASE_URL from '../consts'

class Question extends Model {
    static app_name = 'question'
    static model_name = 'question'

    constructor({id, title, content, date, bounty,
                 viewTimes, status, owner, owner_instance,
                 tags, answers, background_image, content_type_id}) {
        super({title, content, bounty, owner, status, background_image})

        this.app_name = 'question'
        this.model = "question"
        this.pk = id

        this.date = date
        this.viewTimes = viewTimes
        this.background_image = background_image
        this.content_type_id = content_type_id

        if (owner_instance != undefined) {
            this.owner_instance = new User(owner_instance)
        }
        this.html_content = marked(this.content)

        if (tags != undefined) {
            this.tags = []
            tags.forEach(tag => { this.tags.push(new Tag(tag)) })
        }
        if (answers != undefined) {
            this.answers = []
            answers.forEach(answer => { this.answers.push(new Answer(answer)) })
        }
    }

    static async getOwnerQuestion(request_user_id) {
        let results= await axios.get(BASE_URL + `question/query-related-content/`,{
            params: { request_user: request_user_id }
        }
        )
        let result_list = []
        for (let result of results.data) {
            result_list.push(new Question(result))
        }
         return result_list
    }

    async save() {
        let config = {
            headers:{'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
        };
        let param = new FormData();
        param.append('id', this._getData().id);
        param.append('title', this._getData().title);
        param.append('content', this._getData().content);

        // allow blank bounty
        if(this._getData().bounty)
            param.append('bounty', this._getData().bounty);

        param.append('owner', this._getData().owner);

        // allow blank background image
        if(this._getData().background_image != undefined)
            param.append('background_image', this._getData().background_image);
        let response = await axios.post(this._getModelURL(), param,config)
        this.pk = response.data.id
        return response
    }

    async update(picture) {
        if(picture == undefined || picture == "") {
            let data = this._getData()
            if(!data.bounty) delete data.bounty
            return await axios.put(this._getInstanceURL(), data)
        }
        else {
            let config = {
                headers:{'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
            };
        let param = new FormData();
        param.append('id', this._getData().id);
        param.append('title', this._getData().title);
        param.append('content', this._getData().content);
        // allow blank bounty
        if(this._getData().bounty)
            param.append('bounty', this._getData().bounty);
        
        param.append('owner', this._getData().owner);
        param.append('background_image', this._getData().background_image);
        return await axios.put(this._getInstanceURL(), param,config)
      }
    }

    //get questions by page_id
    static async getOnePage(page_id){
        let response = await axios.get(BASE_URL + 'question/question', {
            params: {
                page: page_id,
            }
        })
        let wrapped_questions = []
        response.data.results.forEach(question => {
            wrapped_questions.push(new Question(question))
        })
        var res = {questions: wrapped_questions, count: response.data.count}
        return res
    }

    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default Question
