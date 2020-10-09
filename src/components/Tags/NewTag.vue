<template>
  <div class="allgrid">
    <div>
      <p>Tags</p>
      <ul class="list">
        <li v-for="tag in tags" :key="tag">
          {{tag}}
          <el-button @click="remove(tag)">remove</el-button>
        </li>
      </ul>
    </div>
    <div class="NewTag">
      <el-input class="text" type="text" v-model="tag"></el-input>
      <p v-show="warning" style="color: red;">you can't add a tag without giving a name!</p>
      <el-button class="tag-btn" @click="addTag()">add tag</el-button>
    </div>
  </div>
</template>

<script>
import {removeItem} from '@/assets/utils/classNameHandler'

export default {
  name: "NewTag",
  data() {
    return {
      tag: '',
      tags: [],
      warning: false
    }
  },
  methods: {
    addTag() {
      if (this.tag == '') { this.warning = true; return }
      for (let tag of this.tags) {
        if (tag == this.tag) {
          alert("you can't add same tag twice!")
          this.tag = ''
          return
        }
      }
      this.tags.push(this.tag)
      this.tag = ''
      this.warning = false
    },
    remove(tag) {
      removeItem(this.tags, tag)
    }
  }
}
</script>

 <style scoped>
.allgrid{
  line-height: 2px;
}
.NewTag{
  display: grid;
  flex-direction: row;
  grid-template-areas: "text btn";
  grid-template-columns: 81% 18%;
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
}
ul{
  list-style: none;
  display: flex;
  flex-direction: row;
}

</style>
