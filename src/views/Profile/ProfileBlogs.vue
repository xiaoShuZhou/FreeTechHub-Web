<template>
  <div class="ProfileBlogs">
    <div class="BlogList">
      <input type="text" placeholder="Search"/>
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
import BlogDetail from '@/views/Profile/ProfileBlogDetail.vue'
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
  grid-template-areas: 'BlogList BlogDetail';
  grid-template-columns: 20% 80%;
}
.BlogList{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fbfbff;
  overflow: scroll;
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
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: #f4f3f7;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
	background-position: right;
	background-repeat: no-repeat;
  line-height: normal;
	text-align:center;
	vertical-align:middle;
	font-size: 30px;
  outline: none;
}
input::-webkit-input-placeholder{
	color: #000000;
	font-size: 30px;
	text-align: center;
	height: 40px;
	line-height: 40px;
}
input::-moz-placeholder{
	color: #000000;
	font-size: 30px;
	text-align: center;
}
input:focus::-webkit-input-placeholder{
  color: transparent;
}
</style>
