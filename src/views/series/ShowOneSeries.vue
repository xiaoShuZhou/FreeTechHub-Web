<template>
  <div class="ShowOneSeries">
    <Navbar/>
    <img class="landing" src="@/assets/img/landing.jpg" alt="">
    <h1>{{series.name}}</h1>
    <p>{{series.description}}</p>
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
            <img class="avatar" :src="series.owner_instance.avatar">
            <a href="">用户名</a>
          </div>
          <h4>Tags: </h4>
          <ul>
            <li v-for="tag in series.tags" :key="tag.pk">
              {{tag.tag_name}}
            </li>
          </ul>
          <p>{{ series.description | stringfilter}}</p>
          <p class="readmore">CONTINUE READING<img class="icon" src="@/assets/img/向右.svg" alt=""></p>
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
            <img class="avatar" :src="series.owner_instance.avatar">
            <a href="">用户名</a>
          </div>
          <h4>Tags: </h4>
          <ul class="tag-list">
            <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
          </ul>
          <p>{{blog.content | stringfilter}}</p>
          <p class="readmore">CONTINUE READING<img class="icon" src="@/assets/img/向右.svg" alt=""></p>
        </div>
      </li>
    </ul>
    <div class="buttons">
      <el-button @click="editSeries">Edit</el-button>
      <el-button @click="deleteSeries">Delete</el-button>
    </div>
    <Footer class="footer"/>
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
    Footer,
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
.ShowOneSeries {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
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
  background: rgba(221, 218, 218, 0.1);
}
.card-img{
  width: 100%;
  height: 50%;
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}
.card:hover  a{
  color: blue;
  transition: all 0.5s ease;
}
.card:hover .icon{
  width: 5%;
  transition: all 0.5s ease;
}
.readmore{
  margin: 0;
}
.card p:nth-last-child(1){
  opacity: 0;
  max-height: 20px;
  margin-bottom: 15px;
}
.card:hover p:nth-last-child(1){
  width: 100%;
  opacity: 1;
  text-align: center;
  color: rgb(0, 0, 255);
  transition: all 0.5s ease;
}
a:-webkit-any-link{
  color: #000;
}
.card:hover a{
  color: blue;
  transition: 0.5s;
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
  cursor: pointer;
}
button:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.2);
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
  border-radius: 50%;
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
a:-webkit-any-link{
  color: black;
}
.footer{
  bottom: 0;
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
