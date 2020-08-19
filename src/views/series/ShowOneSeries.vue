<template>
  <div class="ShowOneSeries">
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
    </div>
    <Navbar/>
    <img class="landing" src="@/assets/img/landing.jpg" alt="">
    <h1>{{series.name}}</h1>
    <h2>Sub series:</h2>
    <ul class="cardlist">
      <li v-for="series in sub_series" :key="series.pk">
        <div class="card">
          <img class="card-img" src="@/assets/img/landing.jpg"/>
          <h3>
            <router-link :to="{name: 'ShowOneSeries', params: {id: series.pk}}" >
              {{ series.name }}
            </router-link>
          </h3>
          <div class="user">
            <img class="avatar" src="@/assets/img/头像 女孩.svg">
            <a href="">用户名</a>
          </div>
          <h4>Tags: </h4>
          <ul>
            <li v-for="tag in series.tags" :key="tag.pk">
              {{tag.tag_name}}
            </li>
          </ul>
          <p>{{ series.description | stringfilter}}</p>
        </div>
      </li>
    </ul>
    <h2>Blogs:</h2>
    <ul class="cardlist">
      <li v-for="blog in series.blogs" :key="blog.pk">
        <div class="card">
          <img class="card-img" src="@/assets/img/landing.jpg"/>
          <h3 class="title">
            <router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >
              {{ blog.title }}
            </router-link>
          </h3>
          <div class="user">
            <img class="avatar" src="@/assets/img/头像 女孩.svg">
            <a href="">用户名</a>
          </div>
          <h4>Tags: </h4>
          <ul class="tag-list">
            <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
          </ul>
          <p>{{blog.content | stringfilter}}</p>
        </div>
      </li>
    </ul>
    <div class="buttons">
      <button @click="editSeries">Edit</button>
      <button @click="deleteSeries">Delete</button>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Series from '@/assets/utils/models/Series'
import { login_required } from '@/assets/utils/auth'
import Footer from '@/components/Footer.vue'

export default {
  name: "ShowOneSeries",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      series: '',
      sub_series: '',
    }
  },
  methods: {
    reload(id) {
      Series.get(id).then(series => {
        this.series = series
        this.series.get_series()
        .then(sub_series => this.sub_series = sub_series)
      })
    },

    deleteSeries() {
      this.series.delete()
      .then(() => this.$router.push({name: 'ShowSeries'}))
    },

    editSeries() {
      this.$router.push({name: 'EditSeries', params: {id: this.series.pk}})
    }

  },
  created() {
    login_required(this, () => this.reload(this.$route.params.id))
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.reload(vm.$route.params.id)
    })
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
  watch: {
    $route: {
      handler: function(newVal) {
        this.reload(newVal.params.id)
      },
      // 深度深入对象内部变化
      deep: true
    }
  }
}
</script>

<style scoped>
*{
  text-decoration: none;
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
.ShowOneSeries {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh 0;
  padding: 0 10vw;
}
.landing{
  width: 100vw;
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
}
.card-img{
  width: 100%;
  height: 50%;
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}
h1{
  text-align: center;
}
ul {
  list-style: none;
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
  margin-bottom: 10%;
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
h3{
  margin: 20px 10px;
  text-align: center;
}
h4{
  margin: 20px 10px;
}
p{
  word-wrap: break-word;
  padding: 0 20px;
}
@media screen and (max-width: 1280px){
  .ShowOneSeries{
    width: 100%;
    height: 100%;
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
