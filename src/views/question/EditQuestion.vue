<template>
  <div class="container">
    <Navbar/>
    <div class="title">
      <el-input class="question-title" type="text" v-model="title" placeholder="Title"></el-input>
    </div>
    <el-button class="btn" @click="saveQuestion">保存</el-button>
    <div class="bounty">
      <h2>Bounty</h2>
      <el-input type="number" class="bounty-input" v-model = "bounty" placeholder="Bounty"></el-input>
    </div>
    <div class="editor">
      <mavon-editor :ishljs = "true" :preview="true" v-model="content"  placeholder="Content" />
    </div>
    <NewTag class="newtag" ref="NewTag"/>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Transaction from '@/assets/utils/models/Transaction'
import { login_required } from '@/assets/utils/auth'
import NewTag from '@/components/Tags/NewTag.vue'
import Tag from '@/assets/utils/models/Tag'
import Navbar from '@/components/Navbar'
export default {
  name: 'EditQuestion',
  props: {
  },
  components: {
    NewTag,
    Navbar
  },
  data(){
    return {
      id:'',
      title:'',
      content:'',
      bounty:'',
      user:'',
      question:'',
      tags: []
    }
  },
  methods:{
    _getQuestion() {
      return new Question({
        id: this.id,
        title: this.title,
        content: this.content,
        bounty: this.bounty,
        owner: this.user.pk,
      })
    },
     _getTransaction() {
      return new Transaction({
        user: this.user.pk,
        amount: this.bounty,
        transaction_type: 'PBQ',
        description:this.title,
      })
    },
    saveQuestion() {
      let question = this._getQuestion()
      if (this.$route.name == "NewQuestion"){
        if (this.user.balance >= this.bounty){
            question.save().then(res => {
              let transaction = this._getTransaction()
              this.tags = this.$refs.NewTag.tags
              let promises = [
                transaction.save(),
                Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
              ]
              
              Promise.all(promises).then(() => {
                this.$router.push({name:'ShowQuestions'})
            })
          })
        } else {
          alert("your balance is not enough.")
        }
      } else {
        if (this.user.balance >= this.bounty){
          question.update().then(res => {
            let transaction = this._getTransaction()
            this.tags = this.$refs.NewTag.tags
            let promises = [
              transaction.save(),
              Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            ]
            Promise.all(promises).then(() => {
              this.$router.push({name:'ShowQuestion', params: {id: this.id }})
            })
          })
        } else {
          alert("your balance is not enough.")
        }
      }
    },
  },
  created() {
    login_required(this, user => {
      this.user = user
      if (this.$route.params.id != undefined) {
        Question.get(this.$route.params.id)
        .then(question => {
          this.title = question.title
          this.content = question.content
          this.bounty = question.bounty
          this.id = question.pk
          this.owner = question.owner
          question.tags.forEach(tag => {
            this.$refs.NewTag.tags.push(tag.tag_name)
          })
        })
      }
    })
  }
}
</script>

<style scoped>
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}
h2{
  text-align: center;
  word-break: break-all;
}
.container{
  display: grid;
  height: 90vh;
  padding-top: 11vh;
  grid-template-areas: "title btn"
                       "bounty bounty"
                       "newtag newtag"
                       "editor editor";
  grid-template-rows: 10% 10% 15% 65%;
  grid-template-columns: 90% 10%;
  grid-row-gap: 2vh;
}
.btn{
  grid-area: btn;
}
.editor{
  grid-area: editor;
  height: 100%;
}
.title{
  grid-area: title;
  display: flex;
}
.bounty{
  grid-area: bounty;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}
.newtag{
  grid-area: newtag;
}
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}
/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
}
/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}
/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}
/* Add a card effect for articles */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
input{
  width: 180px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid black;
  outline: none;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(5rem);
}
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-move {
  transition: all 1s ease;
}
.v-leave-active {
  position: absolute;
}
.btn{
  width: 100%;
}
</style>
<style>
.bounty-input .el-input__inner{
  height: 100%;
}
.question-title .el-input__inner{
  height: 80px;
  width: 100%;
}
.btn .el-button{
  width: 100%;
  height: 80px;
}
</style>