<template>
  <div class="ShowBlogs">
    <StarBackground/>
    <Navbar :_user="user"/>
    <h1>Blogs</h1>
    <ul class="cardlist">
      <li v-for="blog in blogs" :key="blog.pk">
        <div class="card">
          <img src="@/assets/img/landing.jpg" class="card-img">
          <h3 class="title">
            <router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >
              {{ blog.title }}
            </router-link>
          </h3>
          <div class="user">
            <img class="avatar" :src="blog.owner_instance.avatar">
            <router-link :to="{name: 'ProfileInformation', params: {id: blog.owner_instance.pk}}">
              {{blog.owner_instance.username}}
            </router-link>
          </div>
          <h4>Tags: </h4>
          <ul class="tag-list">
            <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
          </ul>
          <p class="content" v-html="$options.filters.stringfilter(blog.html_content)"></p>
          <p class="readmore">CONTINUE READING<img class="icon" src="@/assets/img/向右.svg" alt=""></p>
        </div>
      </li>
    </ul>
    <pagination @setPage="setPage" v-if="totalPages != ''"
      :_curPage="currentPage"
      :total="totalPages">
    </pagination>
    <el-button @click="newBlog">create new blog</el-button>
    <Footer/>
  </div>  
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import { is_authenticated, login_required } from '@/assets/utils/auth'
import renderMath from "@/assets/utils/renderMath"
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Pagination from '@/components/Pagination.vue'
import StarBackground from '@/components/StarBackground'

export default {
  name: "ShowBlog",
  components: {
    Navbar,
    Footer,
    StarBackground,
    Pagination
  },
  data() {
    return {
      blogs: '',
      totalPages:'',
      pageSize: 5,
      currentPage: 1,
      blogshow: '',
      user: '',
    }
  },
  methods: {
    newBlog() {
      login_required(this, () => this.$router.push({name: 'NewBlog'}))
    },

    getBlogs(page_id){
      Blog.getOnePage(page_id).then(res => {
        var {blogs, count} = res
        this.totalPages = Math.ceil(count/this.pageSize)
        this.blogs = blogs
      })
    },

    setPage(new_page) {
      this.currentPage = new_page
      this.getBlogs(new_page)
    },
  },

  created() {
    is_authenticated(this).then(() => {
      this.user = this.$store.state.user
      this.getBlogs(this.currentPage)
    })
  },
  
  watch: {
    blogs() {
      this.$nextTick().then(() => {
        renderMath()
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1{
  color: rgb(215, 180, 219);
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
  margin-bottom: 10%;
}

.ShowBlogs {
  width: 100%;
  height: 100%;
  padding: 0 10vw;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  transition: all 0.5s ease;
}
.cardlist li{
  margin: 0 2vw;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  background: rgba(221, 218, 218, 0.1);
  word-break: break-all;
}
.card > h4 {
  margin: 20px;
}
.card p {
  margin: 20px;
  font-weight: 300;
}
.readmore{
  margin: 0;
  justify-content: flex-end;
  opacity: 0;
  max-height: 20px;
}
.card:hover{
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);
  margin-top: 30px;
}
.card:hover  a{
  color: blue;
  transition: all 0.5s ease;
}
.icon{
  display: none;
}
.card:hover .icon{
  width: 5%;
  transition: all 0.5s ease;
}
.card:hover .readmore{
  width: 100%;
  opacity: 1;
  text-align: center;
  color: rgb(0, 0, 255);
  transition: all 0.5s ease;
}
.title {
  align-self: center;
  padding: 3vh 0;
  font-size: 30px;
}
a:-webkit-any-link{
  color: #000;
}
.card:hover ~ a{
  color:blue;
  transition: all 0.5s ease;
}
.tag-list {
  margin: 0 3vw;
}
a {
  text-decoration: none;
}
.card-img{
  width: 100%;
}
.user{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.avatar{
  width: 20%;
  margin: 10px;
  border-radius: 50%;
}
@media screen and (max-width: 1280px){
  .ShowBlogs{
    width: 100%;
    height: 100%;
    padding: 0 10vw;
    margin-top: 6vh;
  }
  .cardlist {
    list-style: none;
    display: grid;
    width: 100%;
    height: 100%;
    margin-top: 5%;
    grid-template-columns: 50% 50%;
  }
  .cardlist li{
    height: 100%;
    margin: 3vh 0;
  }
  .card:hover .icon{
    width: 5%;
  }
}
@media screen and (max-width: 650px) {
  .ShowBlogs {
    width: 100%;
    height: 100%;
    padding: 0 10vw;
  }
  .cardlist {
    list-style: none;
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 10%;
    flex-direction: column;
    justify-content: center;
  }
  .cardlist li{
    height: 120%;
  }
  .card:hover .icon{
    width: 5%;
  }
  img{
  width: 100%;
  height: 40%;
  }
}
</style>
