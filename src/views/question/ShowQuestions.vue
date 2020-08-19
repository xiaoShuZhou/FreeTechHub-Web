<template>
  <div class="ShowQuestions">
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
    </div>
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
    <button @click="newQuestion">create new question</button>
    <Footer/>
  </div>
</template>

<script>
import Question from "@/assets/utils/models/Question"
import { login_required } from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ShowQuestions',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
        questions:'',
    }
  },
  methods: {
    newQuestion(){
      login_required(this, () => {
        this.$router.push({name: 'NewQuestion'})
      })
    },
  },
  created() {
    Question.all().then(questions => this.questions = questions)
  },
  mounted(){
    let _this = this
    _this.$refs.sky.width = document.documentElement.scrollWidth
    _this.$refs.sky.height =  document.documentElement.scrollHeight 
    function Star(id, x, y){
      this.id = id
      this.x = x
      this.y = y
      this.r = Math.floor(Math.random()*2) + 1;
      var alpha = (Math.floor(Math.random() * 10 ) +1 ) /10 /2
      this.color = "rgba(255,255,255," + alpha + ")"
    }
    Star.prototype.draw = function() {
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 *Math.PI, false)
      ctx.closePath()
      ctx.fill()
    }
    Star.prototype.move = function() {
      this.y -= 1
      if(this.y <= -10) this.y = _Height + 10
      this.draw()
    }
    Star.prototype.die = function() {
      stars[this.id] = null
      delete stars[this.id]
    }
    var canvas = _this.$refs.canvas,
        ctx = canvas.getContext("2d"),
        _Width = _this.$refs.sky.width,
        _Height = _this.$refs.sky.height,
        stars = [],
        initStarsPopulation = 80;
    function setCanvasSize() {
      canvas.setAttribute('width', _Width)
      canvas.setAttribute('height', _Height)
    }
    function __init__(){
      ctx.strokeStyle = 'white';
      ctx.shadowColor = 'white';
      for(var i =0; i < initStarsPopulation; i++){
        stars[i] = new Star(i, Math.floor(Math.random() * _Width), Math.floor(Math.random() * _Height))
      }
      ctx.shadowBlur = 0
      animate()
    }
    function animate(){
      ctx.clearRect(0, 0, _Width, _Height)
      for(var i in stars){
        stars[i].move()
      }
      requestAnimationFrame(animate)
    }
    setCanvasSize()
    __init__()
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
.sky{
  z-index: -1;
  top: 10vh;
  height: 100%;
  width: 100%;
  position: fixed;
	background: radial-gradient(225% 105% at bottom center, #f7f7b6 10%, #e96f92 40%, #75517d 65%, #1b2947);
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
