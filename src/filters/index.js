export default {
  stringfilter: function (value) {
    if (value && value.length > 100) {
      value = value.substring(0, 100) + '...'
    }
    return value
  }
}
