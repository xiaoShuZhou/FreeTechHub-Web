/*
    this function will take in a string and seperate
    it by " " (space) and encode it into URI then 
    return the URI

    input:
        name: keyword string
        type: string
    output:
        value: URI encode keywords
        type: string

    Example:
    let s = "django     web   git"
    getQueryParams(s) --> "django%2Cweb%2Cgit"
*/
export default function getURIKeyWords(str) {
    str = str.split(" ")
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '') {
            str.splice(i, 1)
            i--
        }
    }
    str.join(" ")
    return encodeURIComponent(str)
}
