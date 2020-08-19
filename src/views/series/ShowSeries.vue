<template>
  <div class="ShowSeries">
    <StarBackground />
    <Navbar/>
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
        </div>
      </li>
    </ul>
    <button @click="newSeries">create new series</button>
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
  margin: 10vh 0;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.card-img{
  width: 100%;
  margin: 0;
  padding: 0;
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
