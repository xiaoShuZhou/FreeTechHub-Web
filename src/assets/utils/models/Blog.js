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
                 root_comment, owner_instance, background_image}) {

        super({title, content, owner, series, root_comment, background_image})  // data fields that is requried when save
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
        this.html_content = marked(this.content)
        this.background_image = background_image

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

    static async getOwnerBlog(request_user_id) {
        let results= await axios.get(BASE_URL + `blog/query-related-content/`,{
            params: { request_user: request_user_id }
        }
        )
        let result_list = []
        for (let result of results.data) {
            result_list.push(new Blog(result))
        }

         return result_list
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

    async save() {
        let config = {
            headers:{'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
          };
        let param = new FormData();
        param.append('id', this._getData().id);
        param.append('title', this._getData().title);
        param.append('content', this._getData().content);
        param.append('owner', this._getData().owner);
        if(this._getData().background_image != undefined)
            param.append('background_image', this._getData().background_image);
        let response = await axios.post(this._getModelURL(), param, config)
        this.pk = response.data.id
        return response
    }

    async update(picture) {
        if(picture == undefined||picture == "")
            return await axios.put(this._getInstanceURL(), this._getData())
        else {
            let config = {
                headers:{'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
            };
            let param = new FormData();
            param.append('id', this._getData().id);
            param.append('title', this._getData().title);
            param.append('content', this._getData().content);
            param.append('owner', this._getData().owner);
            if(this._getData().background_image != undefined)
                param.append('background_image', this._getData().background_image);
            return await axios.put(this._getInstanceURL(), param,config)
        }
    }
}

export default Blog
