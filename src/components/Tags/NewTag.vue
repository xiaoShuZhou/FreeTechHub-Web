<template>
  <div class="NewTag">
    <h3>Tags</h3>
    <ul>
      <li v-for="tag in tags" :key="tag">
        {{tag}}
        <button @click="remove(tag)">remove</button>
      </li>
    </ul>
    <input type="text" v-model="tag">
    <button @click="addTag()">add tag</button>
  </div>
</template>

<script>
import {removeItem} from '@/assets/utils/classNameHandler'

export default {
  name: "NewTag",
  data() {
    return {
      tag: '',
      tags: []
    }
  },
  methods: {
    addTag() {
      this.tags.forEach((tag) => {
        if (tag == this.tag) {
          alert("you can't add same tag twice!")
          this.tag = ''
          return
        }
      })
      this.tags.push(this.tag)
      this.tag = ''
    },
    remove(tag) {
      removeItem(this.tags, tag)
    }
  }
}
</script>

<style scoped>

</style>