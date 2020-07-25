<template>
    <div class="showQuestions">
      <h1>Questions</h1>
      <ul>
        <li v-for="question in questions" :key="question.id">
          <div class="card">
            <h4 class="title"><router-link :to="{name: 'showQuestion', params: {id: question.pk}}">{{question.title}}</router-link></h4>
            <p class="content" v-html="question.content"></p>
            <p class="bounty">{{ question.bounty }}</p>
          </div>
        </li>
      </ul>
      <button @click="newQuestion">create new question</button>
    </div>
</template>

<script>
import Question from "../assets/utils/models/Question"
import { is_authenticated } from '@/assets/utils/auth'

export default {
  name: 'ShowQuestions',
  data() {
    return {
        questions:'',
    }
  },

  methods: {
    newQuestion(){
      if( !is_authenticated() ){
        this.$router.push({name: 'login'})
      }else{
        this.$router.push({name: 'newQuestion'})
      }
    },
  },
  created() {
    Question.all().then(questions => this.questions = questions)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
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
</style>
