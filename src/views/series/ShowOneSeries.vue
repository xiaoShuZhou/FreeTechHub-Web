<template>
  <div class="ShowOneSeries">
    <Navbar/>
    <h1>{{series.name}}</h1>
    <h2>Sub series:</h2>
    <ul>
      <li v-for="series in sub_series" :key="series.pk">
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
    <h2>Blogs:</h2>
    <ul>
      <li v-for="blog in series.blogs" :key="blog.pk">
        <div class="card">

          <h3 class="title">
            <router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >
              {{ blog.title }}
            </router-link>
          </h3>

          <h4>Tags: </h4>
          <ul class="tag-list">
            <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
          </ul>
          
        </div>
      </li>
    </ul>
    <div class="buttons">
      <button @click="editSeries">Edit</button>
      <button @click="deleteSeries">Delete</button>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Series from '@/assets/utils/models/Series'
import { is_authenticated } from '@/assets/utils/auth'

export default {
  name: "ShowOneSeries",
  components: {
    Navbar
  },
  data() {
    return {
      series: '',
      sub_series: ''
    }
  },
  methods: {
    reload(id) {
      is_authenticated(this)
      .then(res => {
        if(res == true) {
          Series.get(id).then(series => {
            this.series = series
            this.series.get_series()
            .then(sub_series => this.sub_series = sub_series)
          })
        } else {
          this.$router.push({name: 'Login'})
        }
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
    this.reload(this.$route.params.id)
  },
  watch: {
    $route: {
      handler: function(newVal){
        this.reload(newVal.params.id)
      },
      // 深度深入对象内部变化
      deep: true
    }
  }
}
</script>

<style scoped>
.ShowOneSeries {
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
</style>