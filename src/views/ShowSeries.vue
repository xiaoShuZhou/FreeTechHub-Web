<template>
  <div class="ShowSeries">
    <Navbar/>
    <ul>
      <li v-for="series in all_series" :key="series.pk">
        <h1>{{ series.name }}</h1>
        <p>{{ series.description }}</p>
        <h3>Blogs: </h3>
        <ul>
          <li v-for="blog in series.blogs" :key="blog.pk">
            <router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >
              {{blog.title}}
            </router-link>
          </li>
        </ul>
        <h3>Tags: </h3>
        <ul>
          <li v-for="tag in series.tags" :key="tag.pk">
            {{tag.tag_name}}
          </li>
        </ul>
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
    is_authenticated(this).then(() => console.log(this.$user))
  }
}
</script>

<style scoped>

</style>