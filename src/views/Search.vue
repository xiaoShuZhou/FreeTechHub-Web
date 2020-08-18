<template>
  <div class="Search">
    <Navbar/>
    
    <div class="results" v-if="results.length != 0">
      <div class="card" v-for="result in results" :key="result.model+result.pk">
        <div v-if="result.model == 'blog'">
          <h2 class="title"> 
            [Blog]
            <router-link 
              :to="{name:'ShowBlog', params:{id: result.pk}}">
              {{ result.title }}
            </router-link>
          </h2>
        </div>
        <div v-else-if="result.model == 'question'">
          <h2 class="title"> 
            [Question]
            <router-link 
              :to="{name:'ShowQuestion', params:{id: result.pk}}">
              {{ result.title }}
            </router-link>
          </h2>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>No related content</h1>
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import search from '@/assets/utils/models/search'

export default {
  name: "Search",
  components: {
    Navbar
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

.results {
  margin: 12vh 10vw;
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
}

.card > h4 {
  margin: 0 3vw;
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
</style>