<template>
  <div class="ShowBlogs">
    <Navbar/>
    <h1>Blogs</h1>
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
    <button @click="newBlog">create new blog</button>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import { is_authenticated } from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'

export default {
  name: "ShowBlog",
  components: {
    Navbar
  },
  data() {
    return {
      blogs: ''
    }
  },
  methods: {
    newBlog() {
      if( !is_authenticated() ){
        this.$router.push({name: 'Login'})
      } else {
        this.$router.push({name: 'NewBlog'})
      }
    }
  },
  created() {
    Blog.all().then(blogs => this.blogs = blogs)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.ShowBlogs {
  padding: 0 10vw;
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


a {
  text-decoration: none;
}

</style>