<template>
  <div class="ProfileQuestions">
      <div class="QuestionList">
        <el-row :gutter="20">
          <el-col :span="24">
            <li id="type" v-for="question in questions" :key="question.id" @click="change(question)" :class='question.pk==selected?"selected":""'>
              <ul>
              <el-row>
                <el-col :span="24">
                  <p id="title" @click="show_question(question.pk)"> {{ question.title }}</p>
                  <p id="date"><i class="el-icon-date"></i>{{ question.date }}</p>
                  <p id="content">{{ question.content | ellipsis}}</p>
                  <el-link type="primary" @click="show_question(question.pk)">Continue reading</el-link>
                  <el-divider></el-divider>
                </el-col>
              </el-row>
              </ul>
            </li>
          </el-col>
        </el-row>
      </div>
    <questionDetail :ownerquestion_id="ownerquestion_id" class="QuestionDetail"/>
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
      questions:'',
      ownerquestion_id:'',
      selected:-1
    }
  },
  methods: {
    change(item){
      this.selected=item.id;
    },
    show_question(id) {
      this.ownerquestion_id = id
    },
  } ,
  created() {
    Question.getOwnerQuestion(this.$route.params.id).then(questions => {
      this.questions = questions
      this.ownerquestion_id = questions[0].pk
    })
  },
};
</script>

<style  scoped>
* {
  width: auto;
  text-decoration: none;
}
.selected{
  color:red;
}

.ProfileQuestions{
  display: grid;
  grid-template-areas: 'QuestionList QuestionDetail';
  grid-template-columns: 30% 70%;
  background: #fafbff;
}
.box {
		height: 80%;
		/*overflow-y: auto;*/
		display: flex;
		flex-direction: column;
  }
  .el-card{
		margin-bottom:10px;
  }
  #tilt{
    font-size: 50px;
    color: dimgray;
    font-family:STFQLBYTJW;
    margin: 0px;
  }

  #sum{
    font-size: 20px;
    /* margin:10px */
  }
  #star{
    /* margin:10px; */
    font-size: 30px;
    color: dimgray;
    font-family:STFQLBYTJW;
  }
  #title{
    font-family:STFQLBYTJW;
    font-size: 40px;
    color: black;
    line-height:0px
  }
  #date{
    color:#c3c3c3;
    font-size: smaller;

  }
  #content{
    color: #585858;
    font-family:STFQLBYTJW;
    font-size: 35px;
  }
    .search {
    flex: 1;
    padding: 100px 50px 0 0;
  }

  .search-box {
    background: #2f3640;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-btn {
    color: #C56B47;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-text {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    color: white;
    transition: 0.4s;
    font-size: 16px;
    width: 0;
    border-bottom: #C56B47 2px solid;
    line-height: 40px;
  }

  .search-box:hover {
    width: 240px;
  }

  .search-box:hover > .search-text {
    width: 170px;
    padding: 0 6px;
  }

  .search-box:hover > .search-btn {
    background: white;
  }
/* .ProfileBlogs{
  display: grid;
  grid-template-areas: 'BlogList BlogDetail';
  grid-template-columns: 100% 100%;
}
.BlogList{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: scroll;
}
li{
  display: block;
  list-style: none;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 25px;
  text-align: center;
  line-height: 120px;

}
input{
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: #fafbff;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
	background-position: right;
	background-repeat: no-repeat;
  line-height: normal;
	text-align:center;
	vertical-align:middle;
	font-size: 30px;
  outline: none;
} */
</style>