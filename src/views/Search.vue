<template>
  <div class="Search">
    <StarBackground />
    <Navbar/>
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
import StarBackground from '@/components/StarBackground'

export default {
  name: "Search",
  components: {
    Navbar,
    StarBackground
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