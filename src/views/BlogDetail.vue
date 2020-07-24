<template>
  <div class="blogDetail">
    <h4 class="title">{{ blog.title }}</h4>
    <p class="content">{{ blog.content }}</p>
    <div class="buttons">
        <button @click="editBlog">Edit</button>
        <button @click="deleteBlog">Delete</button>
    </div>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'

export default {
  name: "BlogDetail",
  data() {
    return {
      blog: ''
    }
  },
  methods: {
    deleteBlog() {
        this.blog.delete().then(() => {
            this.$router.push({name: 'showBlogs'})
        })
    },
    editBlog() {
        this.$$router.push({name: 'editBlog', params: { id:this.blog.id }})
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

.blogDetail {
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
    display: flex;
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
