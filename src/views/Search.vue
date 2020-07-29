<template>
  <div class="Search">
    <Navbar/>
    
    <div class="result" v-if="this.blogs.length != 0">
      <div class="blogs">
        <h2>Related blogs:</h2>
        <ul>
          <li v-for="blog in blogs" :key="blog.pk">
            <div class="card">
              <h3 class="title"><router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >{{ blog.title }}</router-link></h3>
              <h4>Tags: </h4>
              <ul class="tag-list">
                <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2 v-else>No related blogs</h2>

    <div class="questions" v-if="this.questions.length != 0">
      <h2>Related questions:</h2>
      <ul>
        <li v-for="question in questions" :key="question.pk">
          <div class="card">
            <h3 class="title"><router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}" >{{ question.title }}</router-link></h3>
            <h4>Tags: </h4>
            <ul class="tag-list">
              <li v-for="tag in question.tags" :key="tag.pk">{{tag.tag_name}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <h2 v-else>No related questions</h2>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Tag from '@/assets/utils/models/Tag'

export default {
  name: "Search",
  components: {
    Navbar
  },
  data() {
    return {
      blogs: '',
      questions: ''
    }
  },
  methods: {
    
  },
  created() {
    let tag = new Tag({tag_name: this.$route.query['tag_name']})
    tag.get_tagged_items().then(res => {
      this.blogs = res.blogs
      this.questions = res.questions
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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