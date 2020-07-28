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
import BlogDetail from './ProfileBlogDetail'
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
  /* box-sizing: border-box; */
  width: auto;
}
.ProfileBlogs{
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.BlogList{
  /* width: 50vh; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-items: stretch;
  background: #fbfbff;
}
.BlogDetail{
  /* width: 50vh; */
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
  margin-left: 60px;
  margin-top: 40px;
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: #f4f3f7;
  border-width: 0;
}
#Search::before{
  content: "";
  background: url("~@/assets/icons/svg/放大镜.svg");
  position: absolute;
  width: 20px;
  height: 30px;
  left: 0px;
}
</style>

