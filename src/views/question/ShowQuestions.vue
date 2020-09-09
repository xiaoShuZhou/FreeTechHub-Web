<template>
  <div class="ShowQuestions">
    <StarBackground />
    <Navbar/>
    <h1>Questions</h1>
    <ul class="cardlist">
      <li v-for="question in questions" :key="question.pk">
        <div class="card">
          <img src="@/assets/img/landing.jpg" class="card-img">
          <h2 class="title"><router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}">{{question.title}}</router-link></h2>
          <div class="user">
            <img class="avatar" src="@/assets/img/头像 女孩.svg">
            <a href="">用户名</a>
          </div>
          <p class="bounty">Bounty:{{ question.bounty }}</p>
          <p class="content" v-html="$options.filters.stringfilter(question.content)"></p>
        </div>
      </li>
    </ul>
    <pagination @setPage="setPage" v-if="totalPages != ''"
      :_curPage="currentPage"
      :total="totalPages">
    </pagination>
    <button @click="newQuestion">create new question</button>
    <Footer/>
  </div>
</template>

<script>
import Question from "@/assets/utils/models/Question"
import { login_required } from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Pagination from '@/components/Pagination.vue'
import StarBackground from '@/components/StarBackground'

export default {
  name: 'ShowQuestions',
  components: {
    Navbar,
    Footer,
    StarBackground,
    Pagination
  },
  data() {
    return {
      questions:'',
      totalPages:'',
      pageSize: 3,
      currentPage: 1,
    }
  },
  methods: {
    newQuestion(){
      login_required(this, () => {
        this.$router.push({name: 'NewQuestion'})
      })
    },
    getQuestions(page_id){
      Question.getOnePage(page_id).then(res => {
        var{questions, count} = res
        this.totalPages = Math.round(count/this.pageSize)
        this.questions = questions
      })
    },
    setPage(new_page){
      this.currentPage = new_page
      this.getQuestions(new_page)
    }
  },
  created() {
    this.getQuestions(this.currentPage)
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
  margin-bottom: 10%;
}
.ShowQuestions {
  width: 100%;
  height: 100%;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  list-style: none;
}

.title {
  text-align: center;
}

.content {
  margin: 2vh 3vw;
  max-width: 100%;
  word-break: break-all;
}

.bounty {
  margin: 0 3vw;
}

.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  transition: all 0.5s ease;
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
}
a {
  text-decoration: none;
}
.user{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.avatar{
  width: 20%;
  margin: 10px;
}
.card-img{
  width: 100%;
  margin: 0;
  padding: 0;
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
    height: 100%;
    margin-top: 5%;
    grid-template-columns: 50% 50%;
  }
  .cardlist li{
    height: 1005;
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
  height: 100%;
  margin-top: 10%;
  flex-direction: column;
  justify-content: center;
  }
  .cardlist li{
    height: 100%;
  }
}
</style>
