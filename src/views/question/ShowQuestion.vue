<template>
  <div class="ShowQuestion">
    <Navbar/>
    <div class="question">
      <h1 class="title">{{ question.title }}</h1>
      <p class="Publisher">Publisher:{{ question.owner }}</p>
      <div class="content" v-html='question.content' v-highlight></div>
      <p class="bounty">Bounty:{{ question.bounty }}</p>
      <p class="status" v-if="question.status == false">Unsolved</p>
      <p class="status" v-else>Solved</p>
      <div class="buttons">
        <button @click="editQuestion">Edit</button>
        <button @click="deleteQuestion">Delete</button>
      </div>
      <hr>
      <h2>Answers:</h2>
      <ul>
        <li v-for="answer in answers" :key="answer.id">
          <div class="card">
            <h2 class="card-title">Answered by {{ answer.owner }} at {{ answer.time }}</h2>
            <p class="content" v-html='answer.m_content' v-highlight></p>
            <p class="status" v-if="answer.status == false">Unaccepted</p>
            <p class="status" v-else>Accepted</p>
            <button>Accept</button>
          </div>
        </li>
      </ul>
      <mavon-editor :ishljs = "true" :preview="true" v-model="content"  placeholder="Post your answer" />
      <button @click="saveAnswer()">Post</button>
      <div class="comment">
        <ul>
          <li>
            <div>
              <img src="@/assets/img/头像 女孩.svg" alt />
              <div>
                <a href>用户1</a>
                <p>回答</p>
              </div>
            </div>
          </li>
          <li>
            <div>
              <img src="@/assets/img/头像 女孩.svg" alt />
              <div>
                <a href>用户1</a>
                <p>回答</p>
              </div>
            </div>
          </li>
          <li>
            <div>
              <img src="@/assets/img/头像 女孩.svg" alt />
              <div>
                <a href>用户1</a>
                <p>回答</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Answer from '@/assets/utils/models/Answer'
import Navbar from '@/components/Navbar.vue'

export default {
  name: "ShowQuestion",
  components: {
    Navbar
  },
  data() {
    return {
      owner:'',
      id:'',
      question: '',
      answers:'',
      content:'',
    }
  },
  methods: {
    deleteQuestion() {
      this.question.delete().then(() => {
        this.$router.push({name: 'ShowQuestions'})
      })
    },
    editQuestion() {
      this.$router.push({name: 'EditQuestion', params:{ id:this.$route.params.id }})
    },
    _getAnswer() {
      return new Answer({
        id:this.id,
        content:this.content,
        owner:this.owner,
        question:this.question.pk,
      })
    },
    getAnswers() {
      Question.get(this.$route.params.id).then(question => {
        this.question = question
        this.answers = question.answers
      })
    },
    saveAnswer() {
      let answer = this._getAnswer()
      answer.save().then(()=>{this.getAnswers()})
    }
  },
  created() {
    this.getAnswers()
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
  padding: 0 10vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: center;
}
.content{
  word-wrap: break-word;
}
.question{
  margin-top: 10vh;
  width: 100%;
  height: 100%;
}
.comment {
  grid-area: comment;
  display: block;
  margin: 5% 2%;
}
.comment img {
  width: 10%;
}
.comment li {
  margin: 20px 10px;
}
.comment li div{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.comment li div div{
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
button {
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  width: 14vw;
  height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin: 3vh 2vw;
}
</style>
