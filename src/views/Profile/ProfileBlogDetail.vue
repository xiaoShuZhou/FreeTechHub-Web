<template>
  <div class="blogdetail">
    <el-card class="box-card">
    <div class="blog">
      <div class="name">
        <h2 align="center">{{blog.title}}</h2>
      </div>
       <el-divider></el-divider>
      <div class="content">
        <p>{{blog.content}}</p>
      </div>
    </div>
    </el-card>
    <div class="box">
      <div id="box2">游览量: <p>{{blog.view_num}}</p></div>
      <div id="box3">点赞数: <p>{{blog.like_num}}</p></div>
      <div id="box4">发布时间: <p>{{blog.date}}</p></div>
    </div>
    <div class="buttongroup">
      <el-button @click="editBlog" id="beeten" round type="warning">Edit</el-button>
      <el-button @click="deleteBlog" id="beeten" round type="danger">Delete</el-button>
    </div>

  </div>
</template>

<script>
import { login_required } from "@/assets/utils/auth";
import Blog from "@/assets/utils/models/Blog";

export default {
  props: ['ownerblog_id'],
  data() {
    return {
      blog:'',
      user:'',
      blog_id: '',
    }
  },
  methods:{
    deleteBlog() {
      this.blog.delete().then(() => {
        this.$router.push({name: 'ShowBlogs'})
      })
    },
    editBlog() {
      this.$router.push({
        name: 'EditBlog',
        params: {
          id: this.ownerblog_id
        }
      })
    },
    load() {
      if(this.ownerblog_id)
      { this.blog_id = this.ownerblog_id
        Blog.get(this.blog_id).then(blog => {
        this.blog = blog
       })
      }
    }

  },

  created() {
    login_required(this, user => {
      this.user = user
      this.load()
    })
  },
  watch: {
    "ownerblog_id": "load"
  },

}

</script>

<style scoped>
.name{
  font-family: "Helvetica Neue";
  font-size: 25px;
}
.content{
  text-indent:2em; 
  font-family:STFQLBYTJW; 
  font-size:30px; 
  width:100%;
  height:500px;
  overflow: auto
}
#beeten{
  font-size: 35px;
}
.blogdetail{
  display: grid;
  grid-gap: 10px;
  grid-template-areas: 'blog 					box'
                       'buttongroup 	box';
  grid-template-columns: 70% 30%;
  grid-template-rows: 70% 30%;
  align-content: center;
  background: #fafbff;
}
.blog{
  border: none;
  grid-area: blog;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-area: box;
}
.box div{
  width: 150px;
  height: 80px;
  border: 1.5px dashed black;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}

.buttongroup{
  grid-area: buttongroup;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.buttongroup button{
  margin: 10px;
  outline: none;
}

.edit{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: paleturquoise;
  color: white;
}
.delete{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
}
</style>
