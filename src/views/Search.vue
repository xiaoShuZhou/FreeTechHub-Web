<template>
  <div class="Search">
    <Navbar/>
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="results" v-if="results.length != 0">
      <ul class="cardlist">
        <li v-for="result in results" :key="result.model+result.pk">
          <div v-if="result.model == 'blog'" class="card">
            <img class="card-img" src="@/assets/img/landing.jpg" alt="">
            <h2 class="title"> 
              [Blog]
              <router-link 
                :to="{name:'ShowBlog', params:{id: result.pk}}">
                {{ result.title }}
              </router-link>
            </h2>
          </div>
          <div class="card" v-else-if="result.model == 'question'">
            <img class="card-img" src="@/assets/img/landing.jpg" alt="">
            <h2 class="title"> 
              [Question]
              <router-link 
                :to="{name:'ShowQuestion', params:{id: result.pk}}">
                {{ result.title }}
              </router-link>
            </h2>
          </div>
          <div v-else>
            <h1>No related content</h1>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import search from '@/assets/utils/models/search'

export default {
  name: "Search",
  components: {
    Navbar
  },
  data() {
    return {
      results: ''
    }
  },
  methods: {
    
  },
  created() {
    search(this.keywords).then(res => this.results = res)
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
  computed: {
    keywords() {
      return this.$route.query.keywords
    }
  },
  watch: {
    keywords(val) {
      search(val).then(res => this.results = res)
    }
  }
}
</script>

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

@keyframes colorChange{
	0%{
		opacity: 0.1;
	}
	50%{
		opacity: 0.9;
	}
	100%{
		opacity: 0.1;
	}
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

.results {
  margin: 12vh 10vw;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.card-img{
  width: 100%;
  height: 50%;
}
.card > h4 {
  margin: 0 3vw;
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
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}

.title {
  align-self: center;
  margin: 3vh 0;
}

.tag-list {
  margin: 0 3vw;
}
@media screen and (max-width: 1280px){
  .ShowOneSeries{
    width: 100%;
    height: 100%;
  }
  .sky{
    top: 6vh;
  }
  .cardlist {
    list-style: none;
    display: grid;
    width: 100%;
    height: 100%;
    margin-top: 5%;
    grid-template-columns: 50% 50%;
    grid-column-gap: 20px;
  }
  .cardlist li{
    max-height: 60vh;
    margin: 2vh 0;
  }
  .card:hover .icon{
    width: 5%;
  }
}
@media screen and (max-width: 650px) {
  .ShowOneSeries {
    width: 100%;
    height: 100%;
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
    height: 120%;
  }
  .card:hover .icon{
    width: 5%;
  }
  img{
  width: 100%;
  height: 40%;
  }
}
</style>