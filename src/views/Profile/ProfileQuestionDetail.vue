<template>
  <div class="questiondetail">
    <el-card class="box-card">
      <div class="question">
        <div class="name">
          <h2 align="center">{{question.title}}</h2>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <p v-html="question.content"></p>
        </div>
      </div>
    </el-card>
    <div class="box">
      <div id="box2">游览量: <p>{{question.viewTimes}}</p>
      </div>
      <div id="box3">发布时间: <p>{{question.date}}</p>
      </div>
    </div>
    <div class="buttongroup">
      <el-button @click="editQuestion" id="beeten" round type="warning">Edit</el-button>
      <el-button @click="deleteQuestion" id="beeten" round type="danger">Delete</el-button>
    </div>
  </div>
</template>

<script>
import { login_required } from "@/assets/utils/auth";
import Question from "@/assets/utils/models/Question";

export default {
  props: ['ownerquestion_id'],
  data() {
    return {
      question:'',
      user:'',
      question_id: '',
    }
  },
  methods:{
    deleteQuestion() {
      this.question.delete().then(() => {
        this.$router.push({name: 'ShowQuestions'})
      })
    },
    editQuestion() {
      this.$router.push({
        name: 'EditQuestion',
        params: {
          id: this.ownerquestion_id
        }
      })
    },
    load() {
      if(this.ownerquestion_id)
      { this.question_id = this.ownerquestion_id
        Question.get(this.question_id).then(question => {
        this.question = question
       })
      }
    }

  },

  created() {
    login_required(this, user => {
      this.user = user
      this.load()
    })
  },
  watch: {
    "ownerquestion_id": "load"
  },

}

</script>

<style scoped>
.name{
  font-family: "Helvetica Neue";
  font-size: 25px;
}
.content{
  text-indent:2em;
  font-family:STFQLBYTJW;
  font-size:30px;
  overflow: auto
}
#beeten{
  font-size: 35px;
}
.questiondetail{
  display: grid;
  grid-gap: 10px;
  grid-template-areas: 'question 					box'
                       'buttongroup 	box';
  grid-template-columns: 70% 30%;
  grid-template-rows: 70% 30%;
  align-content: center;
  background: #fafbff;
}
.question{
  border: none;
  grid-area: question;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-area: box;
}
.box div{
  width: 150px;
  height: 80px;
  border: 1.5px dashed black;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}

.buttongroup{
  grid-area: buttongroup;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.buttongroup button{
  margin: 10px;
  outline: none;
}

.edit{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: paleturquoise;
  color: white;
}
.delete{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
}
</style>
