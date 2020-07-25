<template>
  <div class="ShowQuestion">
    <h4 class="title">{{ question.title }}</h4>
    <p class="content" v-html='question.content'></p>
    <p class="bounty">{{ question.bounty }}</p>
    <div class="buttons">
        <button @click="editQuestion">Edit</button>
        <button @click="deleteQuestion">Delete</button>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'

export default {
  name: "ShowQuestion",
  data() {
    return {
      question: ''
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
    }
  },
  created() {
    Question.get(this.$route.params.id).then(question => this.question = question)
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
