<template>
  <div>
    <div class="ProfileQuestions">
      <div class="questionlist">
        <input type="text" value="" placeholder="Search" οnfοcus="this.placeholder=''" />
        <div >
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="16" class="boxs">
              <li v-for="question in questions" :key="question.pk">
              <el-card shadow="hover"> 
                <router-link id="rlink" :to="{name: 'ShowQuestion', params: {id: question.pk}}">{{question.title}}</router-link>
                <el-divider><i class="el-icon-hot-water"></i></el-divider>
                <el-breadcrumb separator="|">
                  <el-breadcrumb-item id="info">Author:{{question.owner_instance.username}}</el-breadcrumb-item>
                  <el-breadcrumb-item id="info"><i class="el-icon-date"></i>{{ question.date }}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-divider></el-divider>
                <p>{{question.content| ellipsis}}</p>
              </el-card>
              </li>
            </el-col>
          </el-row>
        </div>
      </div>
      <QuestionDetail class="QuestionDetail"/>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import QuestionDetail from '@/views/Profile/ProfileQuestionDetail.vue'
export default {
  components:{
    QuestionDetail
  },
  filters: {
  ellipsis (value) {
    if (!value) return ''
      if (value.length > 15) {
        return value.slice(0,15) + '...'
      }
      return value
    }
  },
  data() {
    return {
      questions:''
    }
  },                                  
  created() {
    Question.getOwnerQuestion().then(questions => this.questions = questions.question)
  },
}
</script>

<style scoped>
*{-------------
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
#info{
  font-family: FZSuXSMCTJW;
  color: brown;
}
#content{
  line-height: 0px;
  float: left;
  color: gray;
  font-size: 20px;
  font-family: FZSJ-RYTJW;
}
#rlink{
  text-align: center;
  font-size: 50px;
  color:SteelBlue;
  font-family:STFQLBYTJW;  
}
.ProfileQuestions{
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 100% 100%;
  justify-items: space-between;
  background: #fafbff;
}
.questionlist{
  list-style: none;
  overflow: scroll;
  margin: 10px;
}
.boxs {
		display: flex;
		flex-direction: column;
	}
.el-card{
	margin-bottom:20px; 
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
  text-align: center;
  list-style: none;
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
  /* align-items: center; */
  grid-area: box;
}
.box div{
  width: 100px;
  height: 60px;
  border: 1.5px dashed black;
  margin: 10px;
  border-radius: 10px;
  /* text-align: center; */
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
