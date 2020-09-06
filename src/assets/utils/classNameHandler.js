/*
    this function will add the class names inside of
    the input html element's className attribute
    input:
        el -> html element
        class_list -> a list of class strings

    Example:
    addClassNames(li, ["active", "foucs"])
*/
export function addClassNames(el, class_list) {
    let classes = el.className.split(" ")
    for (let class_item of class_list) {
        classes.push(class_item)
    }
    el.className = classes.join(" ")
}

function indexOf(list, val) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == val) return i;
    }
    return -1;
}

export function removeItem(list, val) {
    var index = indexOf(list, val);
    if (index > -1) {
        list.splice(index, 1);
    }
}
/*
    this function will remove the class names inside of
    the input html element's className attribute
    input:
        el -> html element
        class_list -> a list of class strings

    Example:
    removeClassNames(li, ["active", "foucs"])
*/
export function removeClassNames(el, class_list) {
    let classes = el.className.split(" ")
    for (let class_item of class_list) {
        removeItem(classes, class_item)
    }
    el.className = classes.join(" ")
}
