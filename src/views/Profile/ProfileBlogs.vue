<template>
  <div class="ProfileBlogs">
    <div class="BlogList">
      <span id="Search"></span>
      <input type="text" placeholder="Search">
      <h2>BlogList</h2>
      <li v-for="blog in blogs" :key="blog.id">
        {{blog.title}}
      </li>
    </div>
    <BlogDetail class="BlogDetail"/>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import BlogDetail from '@/views/Profile/ProfileBlogDetail'
export default {
  components:{
    BlogDetail
  },
  data() {
    return {
      blogs:''
    }
  },
  created() {
    Blog.all().then(blogs => this.blogs = blogs)
  },
};
</script>

<style  scoped>
* {
  width: auto;
}
.ProfileBlogs{
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.BlogList{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  justify-items: stretch;
  background: #fbfbff;
}
.BlogDetail{
  height: 100vh;
}
li{
  display: block;
  list-style: none;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 25px;
  text-align: center;
  padding-left: 200px;
  line-height: 350px;

}
input{
  position: relative;
  margin-right: 100px;
  margin-top: 40px;
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: #f4f3f7;
  border-width: 0;
}
</style>
