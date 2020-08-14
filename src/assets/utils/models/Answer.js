import Model from "./Model";
import marked from 'marked'
import axios from 'axios'
import BASE_URL from '../consts'

class Answer extends Model {
    static app_name = 'question'    
    static model_name = 'answer'   

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, content, time, status, owner,
                 question, like_num, dislike_num,
                 content_type_id}) {
        super({content, owner,question})     // data fields that is requried when save

        this.app_name = 'question'  
        this.model = "answer"      
        this.pk = id            

        this.time = time
        this.status = status
        this.owner = owner
        this.agree_num = like_num
        this.disagree_num = dislike_num
        this.content_type_id = content_type_id
        this.m_content = marked(this.content)
    }

    // Answer custom methods
    async agree() {
        let res = await axios.post(BASE_URL + `like/like-item/`, {
            like_type: true,
            object_id: this.pk,
            content_type: this.content_type_id
        })
        return res.data
    }

    async disagree() {
        let res = await axios.post(BASE_URL + `like/like-item/`, {
            like_type: false,
            object_id: this.pk,
            content_type: this.content_type_id
        })
        return res.data
    }

    async getAgreeHistory() {
        let res = await axios.get(BASE_URL + `like/like-history/`, {
            params: {
                object_id: this.pk,
                content_type: this.content_type_id
            }
        })
        return res.data
    }
    
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default Answer
