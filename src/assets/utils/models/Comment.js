import Model from './Model'
import marked from 'marked'
import BASE_URL from '../consts'
import axios from 'axios'
import Blog from './Blog'
import User from './User'

class Comment extends Model {
    static app_name = 'comment'
    static model_name = 'comment'

    constructor({id, content, time, owner, owner_instance, blog, sub_comments_of, sub_comments}) {
        super({content, owner, sub_comments_of})

        this.app_name = 'comment'
        this.model = 'comment'
        this.pk = id

        this.sub_comments = sub_comments
        this.time = time
        this.status = false
        if (owner_instance != undefined) {
            this.owner_instance = new User(owner_instance)
        }
        this.m_content = marked(this.content)
        this.blog = []
        if (blog != undefined) {
            this.blog = []
            blog.forEach(blog => { this.blog.push(new Blog(blog)) })
        }
    }

    //return the whole dict tree from API based on id of root comment using axios
    static async query_sub_comments(id){
        let res = await axios.get(BASE_URL + `${this.app_name}/` + "query/", {
            params:{id}
        })
        return res.data
    }

    //wrap the whole dict tree and return wrapped tree
    static wrap_sub_comments(comment_tree){
        let wrapped_sub_trees = []

        if (comment_tree.serialized_sub_trees.length == 0) {
            return {
                "comment": new Comment(comment_tree.comment),
                "wrapped_sub_trees": wrapped_sub_trees
            }
        }

        comment_tree.serialized_sub_trees.forEach(sub_tree => {
            let wrapped_sub_tree = Comment.wrap_sub_comments(sub_tree)
            wrapped_sub_trees.push(wrapped_sub_tree)
        })

        let wrapped_comment_tree = {
            "comment": new Comment(comment_tree.comment),
            "wrapped_sub_trees": wrapped_sub_trees
        }
        return wrapped_comment_tree
    }

    //return node where id is located and ids of its sub comments
    static get_matched_comment_tree(comment_tree, id){
        let sub_comment_ids = []
        if (id == comment_tree.comment.pk){
            for(let sub_tree of comment_tree.wrapped_sub_trees){
                sub_comment_ids.push(sub_tree.comment.pk)
            }
            return {
                "comment": comment_tree.comment,
                "sub_comment_ids": sub_comment_ids
            }
        }
        else {
            for(let sub_tree of comment_tree.wrapped_sub_trees){
                let matched_comment_tree = Comment.get_matched_comment_tree(sub_tree, id)
                if (matched_comment_tree != undefined){
                    return matched_comment_tree
                }
            }
        }
        return null
    }

    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default Comment
