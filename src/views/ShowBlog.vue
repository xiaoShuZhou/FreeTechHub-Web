<template>
  <div class="ShowBlog">
    <Navbar/>
    <div class="blog">
      <h1 class="title">{{ blog.title }}</h1>
      <div class="content" v-html="blog.m_content" v-highlight></div>
      <div class="buttons">
      <button @click="editBlog">Edit</button>
      <button @click="deleteBlog">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import Navbar from '@/components/Navbar.vue'
export default {
  name: "ShowBlog",
  components: {
    Navbar
  },
  data() {
    return {
      blog: ''
    }
  },
  methods: {
    deleteBlog() {
      this.blog.delete().then(() => {
          this.$router.push({name: 'ShowBlogs'})
      })
    },
    editBlog() {
      this.$router.push({name: 'EditBlog'})
    }
  },
  created() {
    Blog.get(this.$route.params.id).then(blog => this.blog = blog)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ShowBlog {
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog {
  padding: 3vh 2vw;
  background-color: #fafcff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  text-align: center;
  margin: 7vh 2vw;
}

.buttons {
  display: flex;
  margin: 2vh 2vw;
  justify-content: center;
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
