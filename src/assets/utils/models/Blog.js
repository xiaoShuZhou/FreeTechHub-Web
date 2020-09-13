import Model from "./Model"
import Tag from "./Tag"
import marked from 'marked'
import axios from 'axios'
import BASE_URL from '../consts'
import User from './User'

class Blog extends Model {
    static app_name = 'blog'
    static model_name = 'blog'

    // the input argument must be something like:
    constructor({id, title, content, date, view_num, owner,
                 tags, series, like_num, dislike_num, content_type_id,
                 root_comment, owner_instance}) {
        
        super({title, content, owner, series, root_comment})  // data fields that is requried when save
        // required data fields
        this.app_name = 'blog'
        this.model = "blog"
        this.pk = id

        // this custom data for Blog
        this.date = date
        this.owner = owner
        this.view_num = view_num
        this.like_num = like_num
        this.dislike_num = dislike_num
        this.content_type_id = content_type_id
        this.m_content = marked(this.content)
        
        if (owner_instance != undefined) {
            this.owner_instance = new User(owner_instance)
        }

        if (tags != undefined) {
            this.tags = []
            tags.forEach(tag => { this.tags.push(new Tag(tag)) })
        }
    }

    // blog custom methods
    async like() {
        let res = await axios.post(BASE_URL + `like/like-item/`, {
            like_type: true,
            object_id: this.pk,
            content_type: this.content_type_id
        })
        return res.data
    }

    async dislike() {
        let res = await axios.post(BASE_URL + `like/like-item/`, {
            like_type: false,
            object_id: this.pk,
            content_type: this.content_type_id
        })
        return res.data
    }

    async getLikeHistory() {
        let res = await axios.get(BASE_URL + `like/like-history/`, {
            params: {
                object_id: this.pk,
                content_type: this.content_type_id
            }
        })
        return res.data
    }

    //get blogs by page_id
    static async getOnePage(page_id){
        let response = await axios.get(BASE_URL + 'blog/blog', {
            params: {
                page: page_id,
            }
        })
        let wrapped_blogs = []
        response.data.results.forEach(blog => {
            wrapped_blogs.push(new Blog(blog))
        })

        var res = {blogs: wrapped_blogs, count: response.data.count}
        return res
    }

    // get model by id
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    static async _raw_all(app_name, model_name, constructor) {
        let res = [];
        let response = await axios.get(this.base_URL + app_name + '/' + model_name + '/')
        response.data.results.forEach(element => {
            res.push(new constructor(element))
        })
        return res
    }
    // get all the model
    static async all() {
        return await this._raw_all(this.app_name, this.model_name, this)
    }
}

export default Blog
