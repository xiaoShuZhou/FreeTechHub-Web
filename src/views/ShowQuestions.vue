<template>
    <div class="ShowQuestions">
      <h1>Questions</h1>
      <ul>
        <li v-for="question in questions" :key="question.pk">
          <div class="card">
            <h4 class="title"><router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}">{{question.title}}</router-link></h4>
            <p class="content" v-html="question.content"></p>
            <p class="bounty">Bounty:{{ question.bounty }}</p>
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
  components: {
  },
  data() {
    return {
        questions:'',
    }
  },
  methods: {
    newQuestion(){
      if( !is_authenticated() ){
        this.$router.push({name: 'Login'})
      }else{
        this.$router.push({name: 'NewQuestion'})
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button {
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 8vw;
  min-height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
}
.ShowQuestions {
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  list-style: none;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 70vw;
  min-height: 20vh;
  margin: 5vh;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}

.title {
  align-self: center;
  margin: 3vh 0;
}

.content {
  margin: 0 3vw;
}

.bounty {
  margin: 0 3vw;
}


a {
  text-decoration: none;
}
</style>
