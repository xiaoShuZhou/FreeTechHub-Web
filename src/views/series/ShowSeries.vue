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
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Series from '@/assets/utils/models/Series'
import { is_authenticated } from '@/assets/utils/auth'

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
    getSeries() {
      Series.all().then(all_series => {
        this.all_series = all_series
      })
    }
  },
  created() {
    is_authenticated(this).then(() => this.getSeries())
  }
}
</script>

<style scoped>

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

</style>