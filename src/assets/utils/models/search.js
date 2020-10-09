import getURIKeywords from '@/assets/utils/getURIKeywords'
import Question from "@/assets/utils/models/Question"
import Blog from "@/assets/utils/models/Blog"
import User from "@/assets/utils/models/User"
import BASE_URL from "@/assets/utils/consts"
import axios from "axios"

async function search(keywords) {
    let URI = getURIKeywords(keywords)
    let results = await axios.get(
        BASE_URL + "search/?keywords=" + URI)
    let constructorMap = {
        "Blog": Blog,
        "Question": Question,
        "User": User
    }

    let result_list = []
    for (let result of results.data) {
        let constructor = constructorMap[result.class]
        result_list.push(new constructor(result.instance))
    }
    return result_list
}

export async function blog_recommend(blog) {
    let keywords = ''
    if (blog.tags.length == 0) {
        return ''
    }
    blog.tags.forEach(tag => keywords += ` ${tag.tag_name}`)
    let URI = getURIKeywords(keywords)
    let results = await axios.get(
        BASE_URL + "search/?keywords=" + URI 
        + "&exclude=Question&res_num=4")

    let result_list = []
    for (let result of results.data) {
        if (result.instance.id != blog.pk) {
            result_list.push(new Blog(result.instance))
        }
    }
    return result_list 
}

export default search
