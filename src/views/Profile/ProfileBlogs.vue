<template>
  <div class="ProfileBlogs">
      <div class="BlogList">
        <!-- <el-row>
        <div class="search">
        <el-col :span="6">
        <h2 id="tilt">BlogList</h2>
        </el-col>
        <el-col :span="18">
        <div class="search-box">
          <input class="search-text" type="text" placeholder="Search what you want">
          <a class="search-btn" href=""><i class="fas fa-search"></i></a>
        </div>
        </el-col>
        </div>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div id="type" v-for="blog in blogs" :key="blog.pk">
              <el-row>
                <el-col :span="24">
                
                  <p id="title" @click="show_blog(blog.id)"> {{ blog.title }}</p>
                  <p id="date"><i class="el-icon-date"></i>{{ blog.date }}</p>
                  <p id="content">{{ blog.content | ellipsis}}</p>
                  <el-link type="primary" @click="show_blog(blog.id)">Continue reading</el-link>
                  <el-divider></el-divider>
              
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    <BlogDetail :ownerblog_id="ownerblog_id" class="BlogDetail"/>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import BlogDetail from '@/views/Profile/ProfileBlogDetail.vue'

export default {
  components:{
    BlogDetail
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 15) {
        return value.slice(0,15) + '...'
      }
      return value
    }
  },

  data() {
    return {
      blogs:'',
      ownerblog_id:'',
      url:'http://127.0.0.1:8000'
    }
  },
  methods: {
    show_blog(id) {
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blog_id: id
        }
      })
    },
  } ,
  created() {
    Blog.getOwnerBlog().then(blogs => {
      this.blogs = blogs.blog
      this.ownerblog_id = blogs.blog_id
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blog_id: this.ownerblog_id
        }
      })
    })
  },
};
</script>

<style  scoped>
* {
  width: auto;
  text-decoration: none;
}

.ProfileBlogs{
  display: grid;
  grid-template-areas: 'BlogList BlogDetail';
  grid-template-columns: 30% 70%;
  background: #fafbff;
}
.box {
		height: 80%;
		/*overflow-y: auto;*/
		display: flex;
		flex-direction: column;
  }
  .el-card{
		margin-bottom:10px;
  }
  #tilt{
    font-size: 50px;
    color: dimgray;
    font-family:STFQLBYTJW;
    margin: 0px;
  }

  #sum{
    font-size: 20px;
    /* margin:10px */
  }
  #star{
    /* margin:10px; */
    font-size: 30px;
    color: dimgray;
    font-family:STFQLBYTJW;
  }
  #title{
    font-family:STFQLBYTJW;
    font-size: 40px;
    color: black;
    line-height:0px
  }
  #date{
    color:#c3c3c3;
    font-size: smaller;

  }
  #content{
    color: #585858;
    font-family:STFQLBYTJW;
    font-size: 35px;
  }
    .search {
    flex: 1;
    padding: 100px 50px 0 0;
  }

  .search-box {
    background: #2f3640;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-btn {
    color: #C56B47;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-text {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    color: white;
    transition: 0.4s;
    font-size: 16px;
    width: 0;
    border-bottom: #C56B47 2px solid;
    line-height: 40px;
  }

  .search-box:hover {
    width: 240px;
  }

  .search-box:hover > .search-text {
    width: 170px;
    padding: 0 6px;
  }

  .search-box:hover > .search-btn {
    background: white;
  }
/* .ProfileBlogs{
  display: grid;
  grid-template-areas: 'BlogList BlogDetail';
  grid-template-columns: 100% 100%;
}
.BlogList{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: scroll;
}
li{
  display: block;
  list-style: none;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 25px;
  text-align: center;
  line-height: 120px;

}
input{
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: #fafbff;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
	background-position: right;
	background-repeat: no-repeat;
  line-height: normal;
	text-align:center;
	vertical-align:middle;
	font-size: 30px;
  outline: none;
} */
</style>
