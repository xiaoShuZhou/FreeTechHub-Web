export default {
  stringfilter: function (value) {
    if (value && value.length > 50) {
      value = value.substring(0, 50) + '...'
    }
    return value
  }
}