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
.allgrid{
  line-height: 2px;
}
.NewTag{
  display: grid;
  flex-direction: row;
  grid-template-areas: "text btn";
  grid-template-columns: 89% 10%;
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
