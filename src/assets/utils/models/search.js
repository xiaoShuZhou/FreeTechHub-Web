import getURIKeywords from '@/assets/utils/getURIKeywords'
import Question from "@/assets/utils/models/Question"
import Blog from "@/assets/utils/models/Blog"
import BASE_URL from "@/assets/utils/consts"
import axios from "axios"

async function search(keywords) {
    let URI = getURIKeywords(keywords)
    let results = await axios.get(
        BASE_URL + "search/?keywords=" + URI)
    let constructorMap = {
        "Blog": Blog,
        "Question": Question
    }

    let result_list = []
    for (let result of results.data) {
        let constructor = constructorMap[result.model]
        result_list.push(new constructor(result.record))
    }
    return result_list
}

export default search
