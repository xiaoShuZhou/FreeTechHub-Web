<template>
  <div class="ShowSeries">
    <Navbar/>
    <ul>
      <li v-for="series in all_series" :key="series.pk">
        <div class="card">
          <h1>
            <router-link :to="{name: 'ShowOneSeries', params: {id: series.pk}}" >
              {{ series.name }}
            </router-link>
          </h1>
          <p>{{ series.description }}</p>
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

.ShowSeries {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style: none;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 70vw;
  min-height: 20vh;
  margin: 5vh;
  display: flex;
  flex-direction: column;
  padding: 2vh 3vw;
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
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

</style>