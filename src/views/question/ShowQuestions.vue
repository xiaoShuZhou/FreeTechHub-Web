<template>
    <div class="ShowQuestions">
      <Navbar/>
      <h1>Questions</h1>
      <ul class="cardlist">
        <li v-for="question in questions" :key="question.pk">
          <div class="card">
            <h4 class="title"><router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}">{{question.title}}</router-link></h4>
            <p class="content" v-html="$options.filters.stringfilter(question.content)"></p>
            <!-- <p class="content" v-html="question.content"></p> -->
            <p class="bounty">Bounty:{{ question.bounty }}</p>
          </div>
        </li>
      </ul>
      <button @click="newQuestion">create new question</button>
    </div>
</template>

<script>
import Question from "@/assets/utils/models/Question"
import { is_authenticated } from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'ShowQuestions',
  components: {
    Navbar
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
  },
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
  height: 200vh;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  list-style: none;
}

.title {
  align-self: center;
  margin: 3vh 0;
}

.content {
  margin: 0 3vw;
  max-width: 100%;
}

.bounty {
  margin: 0 3vw;
}

.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 200vh;
  margin-top: 5%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}
.cardlist li{
  margin: 2vh 2vw;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  justify-content: space-around;
  align-items: center;
}

a {
  text-decoration: none;
}
@media screen and (max-width: 1025px){
  .ShowQuestions {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  }
  .cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 200vh;
  margin-top: 5%;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(3, 33.3%);
  }
  .cardlist li{
    max-height: 60vh;
  }
}
@media screen and (max-width: 650px) {
  .ShowQuestions {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
  .cardlist {
  list-style: none;
  display: flex;
  width: 100%;
  margin-top: 10%;
  flex-direction: column;
  justify-content: center;
  }
  .cardlist li{
    height: 100%;
  }
}
</style>
