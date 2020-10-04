<template>
  <div class="ShowQuestion">
    <Navbar />
    <div class="question" v-if="question != ''">
      <div class="title">
        <h1>{{ question.title }}</h1>
        <p class="bounty">Bounty:{{ question.bounty }}</p>
        <p class="status" v-if="question.status == false">Unsolved</p>
        <p class="status" v-else>Solved</p>
      </div>
      <div class="left">
        <div class="Publisher">
          <img class="avatar" :src="question.owner_instance.avatar" />
          <h1>{{ question.owner_instance.username }}</h1>
        </div>
      </div>
      <div class="taggroup" v-if="question.tags.length != 0">
        <a href class="tag" v-for="tag in question.tags" :key="tag.pk">
          <img class="tag-img" src="@/assets/img/标签.svg" alt />
          <span>{{ tag.tag_name }}</span>
        </a>
      </div>
      <div class="content" v-html="question.content" v-highlight></div>
      <div class="buttons">
        <el-button @click="editQuestion">Edit</el-button>
        <el-button @click="deleteQuestion">Delete</el-button>
      </div>
      <div class="answear">
      <h2>Answers:</h2>
      <div v-if="accepted_answer != ''">
      <show-answers @updatedAnswer="updatedAnswer"
        :_answer="accepted_answer"
        :question="question"
        :_is_accepted="true"
        :_user="user">
      </show-answers>
      <li v-for="answer in answers" :key="answer.pk">
        <div v-if="answer.status == false">
          <show-answers @updatedAnswer="updatedAnswer"
            :_answer="answer"
            :question="question"
            :_is_accepted="true"
            :_user="user">
          </show-answers>
        </div>
      </li>
      </div>
      <div v-else>
        <li v-for="answer in answers" :key="answer.pk">
          <show-answers @updatedAnswer="updatedAnswer"
            :_answer="answer"
            :question="question"
            :_is_accepted="false"
            :_user="user">
          </show-answers>
        </li>
      </div>
      </div>  
      <div class="editor" v-if="this.accepted_answer == ''">
      <mavon-editor
        :ishljs="true"
        :preview="true"
        v-model="content"
        placeholder="Post your answer"
      />
      <el-button @click="saveAnswer()">Post</el-button>
      </div>
    </div> 
    <Footer/>
  </div>
</template>

<script>
import Question from "@/assets/utils/models/Question";
import Answer from "@/assets/utils/models/Answer";
import { login_required } from '@/assets/utils/auth';
import renderMath from "@/assets/utils/renderMath"
import Navbar from "@/components/Navbar.vue";
import Footer from '@/components/Footer.vue'
import ShowAnswers from '@/components/ShowAnswers.vue';

export default {
  name: "ShowQuestion",
  components: {
    Navbar,
    Footer,
    ShowAnswers,
  },
  data() {
    return {
      user:'',
      id: '',
      question: '',
      answers:'',
      accepted_answer:'',
      content: '',
    }
  },
  methods: {
    deleteQuestion() {
      this.question.delete().then(() => {
        this.$router.push({ name: "ShowQuestions" })
      })
    },

    editQuestion() {
      this.$router.push({
        name: "EditQuestion",
        params: { id: this.$route.params.id },
      })
    },

    _getAnswer() {
      return new Answer({
        id: this.id,
        content: this.content,
        owner: this.user.pk,
        question: this.question.pk,
      })
    },

    saveAnswer() {
      let answer = this._getAnswer()
      answer.save().then(() => {
        this.content = ''
        Question.get(this.$route.params.id).then(question => {
          this.question = question
          this.answers = question.answers
          for (let answer of this.answers) {
            if (answer.status == true) {
              this.accepted_answer = answer
            }
          }
        })
      })
    },

    updatedAnswer(updated_answer) {
      this.accepted_answer = updated_answer
    },
  },

  created() {
    login_required(this, user => {
      this.user = user
      Question.get(this.$route.params.id).then(question => {
        this.question = question
        this.answers = question.answers
        for (let answer of this.answers) {
          if (answer.status == true) {
            this.accepted_answer = answer
          }
        }
      })
    })
  },
  
  watch: {
    question() {
      this.$nextTick().then(() => {
        renderMath()
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.ShowQuestion {
  margin-top: 10vh;
  width: 100%;
  height: 100%;
}
.title{
  grid-area: title;
}
.title h1{
  text-align: center;
}
.left{
  margin: 0;
  padding: 0;
  position: fixed;
  width: 25%;
  height: 100vh;
  font-weight: 900;
  font-family: Georgia, 'Times New Roman', Times, serif;
  grid-area: left;
  background: #193747;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.landing {
  position: absolute;
  width: 100%;
  z-index: -1;
}
.title p {
  display: inline-block;
  margin: 2vh 2vw;
}
.Publisher {
  margin: 2vh 3vw;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15vh;
}
.Publisher img {
  width: 40%;
  border-radius: 50%;
}
.Publisher h1{
  margin-top: 3vh;
}
.buttons {
  grid-area: buttons;
  display: flex;
  justify-content: center;
}
.content {
  grid-area: content;
  word-wrap: break-word;
  margin-left: 5vw;
}
.question{
  width: 100%;
  height: 100%;
  z-index: 1;
  background: white;
  display: grid;
  grid-template-areas: "left title"
                       "left content"
                       "left taggroup"
                       "left buttons"
                       "left answear"
                       "left editor";
  grid-template-columns: 25% 75%;
  grid-column-gap: 20px;
}
.answear{
  grid-area: answear;
}
.editor{
  grid-area: editor;
}
.comment {
  grid-area: comment;
  display: block;
  margin: 5% 2%;
}
.comment img {
  width: 60%;
  min-width: 100px;
}
.comment li {
  margin: 8vh 10px;
  padding-bottom: 2vh;
  border-bottom: 1px solid gray;
}
.comment li:nth-last-child(1) {
  border: none !important;
}
.card {
  display: grid;
  grid-template-areas:
    "card-title card-title   status"
    "card-img card-content accept";
  grid-template-columns: 10% 80% 10%;
  justify-items: stretch;
  grid-gap: 20px;
}
.card-img {
  grid-area: card-img;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-title {
  grid-area: card-title;
}
.card-content {
  grid-area: card-content;
  word-break: break-all;
}
.tag {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}
.tag-img{
  width: 20%;
}
.tag:hover{
  border-bottom: 1px solid rgba(79, 177, 186, 0.5);
}
.tag:focus{
  border-bottom: 2px solid rgba(4, 112, 124, 0.5)
}
.icon {
  width: 40%;
}
.taggroup{
  grid-area: taggroup;
  display: flex;
  justify-content: baseline;
  flex-wrap: wrap;
}
.status {
  grid-area: status;
  align-self: center;
  text-align: center;
}
.accept {
  grid-area: accept;
  margin: 0;
  align-self: center;
  width: 100%;
}
button {
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  width: 14vw;
  height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin: 3vh 2vw;
}
@media screen and (max-width: 1025px) {
  .ShowQuestion {
    margin-top: 6vh;
  }
  .question {
    margin: 0;
    width: 90%;
  }
}
@media screen and (max-width: 550px) {
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttons button {
    width: 80%;
  }
  .card {
    display: grid;
    grid-template-areas:
      "card-img card-img"
      "card-title card-title"
      "card-content card-content"
      "status accept";
    grid-template-columns: 50% 50%;
  }
  .card-img {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .card-img img {
    max-width: 100px;
    margin-right: 7vw;
  }
}
</style>
