<template>
  <div class="container">
    <h2>Title:{{title}}</h2>
    <div class="form-group">
      <input type="text" v-model="title" class="form-control" placeholder="Title">
    </div>
    <div class="form-group">
      <input type="number" v-model = "bounty" placeholder="Bounty">
    </div>
    <div class="content">
      <h2>Content:</h2>
      <p v-html="content" v-highlight></p>
    </div>
    <div class="editor">
      <mavon-editor :ishljs = "true" :preview="true" v-model="content"  placeholder="Content" />
    </div>
    <div class="button">
      <button class="btn btn-outline btn-success" @click="saveQuestion">保存</button>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Transaction from '@/assets/utils/models/Transaction'
import { login_required } from '@/assets/utils/auth'
import marked from 'marked'

export default {
  name: 'EditQuestion',
  props: {
  },

  data(){
    return {
      id:'',
      title:'',
      content:'',
      bounty:'',
      user:'',
      question:'',
    }
  },

  methods:{
    _getQuestion(){
      return new Question({
        id: this.id,
        title: this.title,
        content: marked(this.content),
        bounty: this.bounty,
        owner: this.user.pk,
      })
    },
     _getTransaction(){
      return new Transaction({
        user: this.user.pk,
        amount: this.bounty,
        transaction_type: 'PBQ',
        description:this.title,
      })
    },
    saveQuestion(){
      let question = this._getQuestion()
      if(this.$route.name == "NewQuestion"){
        if (this.user.balance >= this.bounty){
            question.save().then(()=>{
              let transaction = this._getTransaction()
              transaction.save().then(() => {
                this.$router.push({name:'ShowQuestions'})
            })
          })
        }else{
          alert("your balance is not enough.")
        }
      }else{
        if (this.user.balance >= this.bounty){
          question.update().then(()=>{
            let transaction = this._getTransaction()
            transaction.save().then(() => {
              this.$router.push({name:'ShowQuestion', params: {id: this.id }})
            })
          })
        }else{
          alert("your balance is not enough.")
        }
      }
    },
  },
  created(){
    login_required(this, user => this.user = user)
    if(this.$route.params.id != undefined){
      Question.get(this.$route.params.id).then(question => {
        this.title = question.title
        this.content = question.content
        this.bounty = question.bounty
        this.id = question.pk
        this.owner = question.owner
      })
    }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.form-group{
  text-align: center;
  margin: 5vh 0;
}

.btn{
  border-radius: 20px;
  border: 2px solid #ffcec1;
  width: 60px;
  height: 30px;
  background: #ffcec1;
  outline: none;
}

</style>
