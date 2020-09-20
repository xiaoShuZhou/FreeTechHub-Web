<template>
  <div class="ShowSeries">
    <StarBackground />
    <Navbar/>
    <h1>Series</h1>
    <ul class="cardlist">
      <li v-for="series in all_series" :key="series.pk">
        <div class="card">
          <img src="@/assets/img/landing.jpg" class="card-img">
          <h1>
            <router-link :to="{name: 'ShowOneSeries', params: {id: series.pk}}" >
              {{ series.name }}
            </router-link>
          </h1>
          <div class="user">
            <img class="avatar" src="@/assets/img/头像 女孩.svg">
            <a href="">用户名</a>
          </div>
          <h3>Tags: </h3>
          <ul>
            <li v-for="tag in series.tags" :key="tag.pk">
              {{tag.tag_name}}
            </li>
          </ul>
          <p class="seriescontent">{{ series.description | stringfilter}}</p>
          <p class="readmore">CONTINUE READING<img class="icon" src="@/assets/img/向右.svg" alt=""></p>
        </div>
      </li>
    </ul>
    <el-button @click="newSeries">create new series</el-button>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Series from '@/assets/utils/models/Series'
import { login_required } from '@/assets/utils/auth'
import StarBackground from '@/components/StarBackground'

export default {
  name: "ShowSeries",
  components: {
    Navbar,
    Footer,
    StarBackground
  },
  data() {
    return {
      all_series: null
    }
  },
  methods: {
    loadSeries() {
      Series.all().then(all_series => {
        this.all_series = all_series
      })
    },
    newSeries() {
      login_required(this, () => this.$router.push({name: "NewSeries"}))
    }
  },
  created() {
    // use login_required can make sure the expired token get removed
    login_required(this, () => this.loadSeries())
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
.ShowSeries {
  width: 100%;
  height: 100%;
  margin-top: 10vh;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1{
  color: rgb(215, 180, 219);
}
.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  margin-top: 10%;
  grid-template-columns: 33.3% 33.3% 33.3%;
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
  background: rgba(221, 218, 218, 0.1);
}
.card-img{
  width: 100%;
  margin: 0;
  padding: 0;
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
h1{
  text-align: center;
}
h3{
  margin: 20px 20px;
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}
.card:hover  a{
  color: blue;
  transition: all 0.5s ease;
}
a:-webkit-any-link{
  color: #000;
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
.seriescontent{
  margin: 20px;
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
@media screen and (max-width: 1025px){
  .ShowSeries {
    width: 100%;
    height: 100%;
    margin-top: 6vh;
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
  .card{
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 650px) {
  .ShowSeries {
    width: 100%;
    height: 100%;
    margin-top: 6vh;
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
