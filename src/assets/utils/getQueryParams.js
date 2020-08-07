/*
    this function will get the key value of
    the parameter in the URL. if the parameter
    does not exsit, it return null.

    input:
        name: key name
        type: string
    output:
        value: the key value of the parameter in the URL
        type: string or null

    Example:
    url : http://127.0.0.1:8080/?code=666#/login/
    getQueryParams('code') --> '666'
*/
export function getQueryParams(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    let r = window.location.search.substr(1).match(reg)

    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
