<template>
  <div class="ProfileBlogs">
      <div class="BlogList">
        <el-row :gutter="20">
          <el-col :span="24">
            <li id="type" v-for="blog in blogs" :key="blog.id" @click="change(blog)">
              <ul>
                <el-row>
                  <el-col :span="24">
                    <p id="title" @click="show_blog(blog.pk)"> {{ blog.title }}</p>
                    <p id="date"><i class="el-icon-date"></i>{{ blog.date }}</p>
                    <p id="content">{{ blog.content | ellipsis}}</p>
                    <el-link type="primary" @click="show_blog(blog.pk)">Continue reading</el-link>
                    <el-divider></el-divider>
                  </el-col>
                </el-row>
              </ul>
            </li>
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
      selected:-1
    }
  },
  methods: {
    change(item){
      this.selected=item.id;
    },
    show_blog(id) {
      this.ownerblog_id = id
    },
  } ,
  created() {
    Blog.getOwnerBlog(this.$route.params.id).then(blogs => {
      this.blogs = blogs
      this.ownerblog_id = blogs[0].pk
    })
  },
};
</script>

<style  scoped>
* {
  width: auto;
  text-decoration: none;
}

.ProfileBlogs {
  display: grid;
  grid-template-areas: 'BlogList BlogDetail';
  grid-template-columns: 30% 70%;
  background: #fafbff;
}

.BlogList {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fafbff;
  overflow: scroll;
}

.box {
  height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.el-card {
  margin-bottom: 10px;
}

#tilt {
  font-size: 50px;
  color: dimgray;
  font-family: STFQLBYTJW;
  margin: 0px;
}

#sum {
  font-size: 20px;
  /* margin:10px */
}

#star {
  /* margin:10px; */
  font-size: 30px;
  color: dimgray;
  font-family: STFQLBYTJW;
}

#title {
  font-family: STFQLBYTJW;
  font-size: 40px;
  color: black;
  line-height: 0px
}

#date {
  color: #c3c3c3;
  font-size: smaller;

}

#content {
  color: #585858;
  font-family: STFQLBYTJW;
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

.search-box:hover>.search-text {
  width: 170px;
  padding: 0 6px;
}

.search-box:hover>.search-btn {
  background: white;
}
</style>
