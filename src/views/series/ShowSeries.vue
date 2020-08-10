<template>
  <div class="ShowSeries">
    <Navbar/>
    <ul class="cardlist">
      <li v-for="series in all_series" :key="series.pk">
        <div class="card">
          <h1>
            <router-link :to="{name: 'ShowOneSeries', params: {id: series.pk}}" >
              {{ series.name }}
            </router-link>
          </h1>
          <p class="seriescontent">{{ series.description | stringfilter}}</p>
          <h3>Tags: </h3>
          <ul>
            <li v-for="tag in series.tags" :key="tag.pk">
              {{tag.tag_name}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <button @click="newSeries">create new series</button>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Series from '@/assets/utils/models/Series'
import { login_required } from '@/assets/utils/auth'

export default {
  name: "ShowSeries",
  components: {
    Navbar
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
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ShowSeries {
  width: 100vw;
  height: 200vh;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  justify-content: space-evenly;
  align-items: center;
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
}
.seriescontent{
  margin: 0 20px 0 20px;
}
@media screen and (max-width: 1025px){
  .ShowSeries {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
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
  .ShowSeries {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
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