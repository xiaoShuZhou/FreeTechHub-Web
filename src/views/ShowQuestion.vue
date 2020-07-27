<template>
  <div class="ShowQuestion">
    <div class="question">
      <h1 class="title">{{ question.title }}</h1>
      <p class="Publisher">Publisher:{{ question.owner }}</p>
      <p class="content" v-html='question.content' v-highlight></p>
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
            <p class="content" v-html='answer.content' v-highlight></p>
            <p class="status" v-if="answer.status == false">Unaccepted</p>
            <p class="status" v-else>Accepted</p>
            <button>Accept</button>
          </div>
        </li>
      </ul>
      <mavon-editor :ishljs = "true" :preview="true" v-model="content"  placeholder="Post your answer" />
      <button @click="saveAnswer()">Post</button>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Answer from '@/assets/utils/models/Answer'

export default {
  name: "ShowQuestion",
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
}

.ShowQuestion {
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
    display: flex;
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
