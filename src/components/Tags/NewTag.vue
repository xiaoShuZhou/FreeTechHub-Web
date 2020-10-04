<template>
  <div class="NewTag">
    <h3 class="title">Tags</h3>
    <ul class="list">
      <li v-for="tag in tags" :key="tag">
        {{tag}}
        <el-button @click="remove(tag)">remove</el-button>
      </li>
    </ul>
    <el-input class="text" type="text" v-model="tag"></el-input>
    <el-button class="tag-btn" @click="addTag()">add tag</el-button>
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
.NewTag{
  display: grid;
  flex-direction: row;
  grid-template-areas: "title text btn"
                       "list list list";
  grid-template-columns: 10% 70% 20%;
  grid-column-gap: 20px;
  justify-items: center;
}
.title{
  grid-area: title;
}
.list{
  grid-area: list;
}
.text{
  grid-area: text;
  width: 100%;
  height: 100%;
}
.tag-btn{
  grid-area: btn;
  width: 100%;
  height: 80%;
}
ul{
  list-style: none;
  display: flex;
  flex-direction: row;
}
li{
  margin: 0 10px;
}
</style>
<style>
.text .el-input__inner{
  height: 80%;
}
</style>
