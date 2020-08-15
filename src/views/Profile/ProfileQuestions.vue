<template>
  <div>
    <div class="ProfileQuestions">
      <div class="questionlist">
        <input type="text" value="" placeholder="Search" οnfοcus="this.placeholder=''" />
        <div class="list">
          <li v-for="question in questions" :key="question.pk">
            <router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}">{{question.title}}</router-link>
          </li>
        </div>
      </div>
      <div class="questiondetail">
        <div class="question">
          <div class="name">
            <h2>问题名</h2> 
          </div>
          <div class="content">
            <p>问题内容</p>
          </div>
        </div>
        <div class="box">
          <div id="box1">
            回答数2233
          </div>
          <div id="box2">
            悬赏金额$98k
          </div>
          <div id="box3">
            状态(已采纳|未采纳)
          </div>
          <div id="box4">
            发布时间
          </div>
        </div>
        <div class="answear">
            <p> <strong>采纳答案：</strong></p> 
        </div>
        <div class="buttongroup">
          <button type="button" class="view">View All</button>
          <button type="button" class="edit">Edit </button>
          <button type="button" class="delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
export default {
  data() {
    return {
      questions:''
    }
  },
  created() {
    Question.all().then(questions => this.questions = questions)
  },
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
.ProfileQuestions{
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 30% 70%;
  justify-items: space-between;
  background-color: #e3f6f1;
}
.questionlist{
  list-style: none;
  overflow: scroll;
  margin: 10px;
}
.questionlist::-webkit-scrollbar {display:none}
input{
  border-radius: 20px;
  border: 2px solid black;
  outline: none;
  width: 150px;
  height: 40px;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
  line-height: normal;
  text-align:center;
  vertical-align:middle;
  font-size: 30px;
  margin: 10px 0 10px 30%;
}
input:focus::-webkit-input-placeholder{
  color: transparent;
}
input::-webkit-input-placeholder{
  color: #000000;
  font-size: 30px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
input::-moz-placeholder{
  color: #000000;
  font-size: 30px;
  text-align: center;
}
li{
  list-style: none;
  text-align: center;
  padding: 10px 0 10px 0;
}
li:nth-child(1){
  border-top: 2px solid #c3c3c3;
  padding-top: 30px;
}
.questiondetail{
  display: grid;
  grid-gap: 10px;
  grid-template-areas: 'question 			box'
                       'answear 			box'
                       'buttongroup 	box';
  grid-template-columns: 70% 30%;
}
.question{
  border: 2px solid black;
  grid-area: question;
  overflow: scroll;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-area: box;
}
.box div{
  width: 100px;
  height: 60px;
  border: 1.5px dashed black;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
}
.answear{
  grid-area: answear;
  border: 2px solid black;
  margin-top: 10px;
  overflow: scroll;
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
.view{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
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
