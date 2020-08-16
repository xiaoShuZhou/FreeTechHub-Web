<template>
  <div class="ShowQuestion">
    <Navbar />
    <img class="landing" src="@/assets/img/landing.jpg" />
    <div class="question">
      <div class="title">
        <h1>{{ question.title }}</h1>
        <div class="Publisher">
          <img src="@/assets/img/头像 女孩.svg" />
          <p>Publisher:{{ question.owner }}</p>
        </div>
        <p class="bounty">Bounty:{{ question.bounty }}</p>
        <p class="status" v-if="question.status == false">Unsolved</p>
        <p class="status" v-else>Solved</p>
      </div>
      <div class="content" v-html="question.content" v-highlight></div>
      <div class="buttons">
        <button @click="editQuestion">Edit</button>
        <button @click="deleteQuestion">Delete</button>
      </div>
      <hr />
      <h2>Answers:</h2>
      <div class="comment">
        <ul>
          <li v-for="answer in answers" :key="answer.id">
            <div class="card">
              <div class="card-img">
                <img src="@/assets/img/头像 女孩.svg" />
                <h4>{{ answer.owner }}</h4>
              </div>
              <h2 class="card-title">{{ answer.time }}</h2>
              <p class="card-content" v-html="answer.m_content" v-highlight></p>
              <h4 class="status" v-if="answer.status == false">Unaccepted</h4>
              <h4 class="status" v-else>Accepted</h4>
              <button class="accept" v-if="answer.status == false">Accept</button>
            </div>
          </li>
        </ul>
      </div>
      <mavon-editor
        :ishljs="true"
        :preview="true"
        v-model="content"
        placeholder="Post your answer"
      />
      <button @click="saveAnswer()">Post</button>
    </div>
  </div>
</template>

<script>
import Question from "@/assets/utils/models/Question";
import Answer from "@/assets/utils/models/Answer";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "ShowQuestion",
  components: {
    Navbar,
  },
  data() {
    return {
      owner: '',
      id: '',
      question: '',
      answers: '',
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
        owner: this.owner,
        question: this.question.pk,
      })
    },
    getAnswers() {
      Question.get(this.$route.params.id).then((question) => {
        this.question = question
        this.answers = question.answers
      })
    },
    saveAnswer() {
      let answer = this._getAnswer()
      answer.save().then(() => {
        this.getAnswers()
      })
    },
  },
  created() {
    this.getAnswers()
  },
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
  align-items: center;
}
.Publisher img {
  width: 20%;
  max-width: 100px;
  min-width: 80px;
}
.buttons {
  display: flex;
  justify-content: center;
}
.content {
  word-wrap: break-word;
  margin-left: 5vw;
}
.question {
  margin-top: 60%;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: white;
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
@media screen and (max-width: 1000px) {
  .landing {
    margin-top: 9vh;
    position: relative;
    width: 100vw;
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
