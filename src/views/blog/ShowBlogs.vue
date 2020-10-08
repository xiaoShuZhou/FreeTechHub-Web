<template>
  <div class="ShowBlogs">
    <Navbar :_user="user"/>
    <h1>Blogs</h1>
    <ul class="Cardlist">
      <li v-for="blog in blogs" :key="blog.pk">
        <div class="Card">
          <img :src="blog.background_image" class="Card-img">
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
    <el-button class="create" @click="newBlog">create new blog</el-button>
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
import { PAGE_SIZE } from '@/assets/utils/consts.js'

export default {
  name: "ShowBlog",
  components: {
    Navbar,
    Footer,
    Pagination
  },
  data() {
    return {
      blogs: '',
      totalPages:'',
      pageSize: 13,
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
        let {blogs, count} = res
        this.totalPages = Math.ceil(count/PAGE_SIZE)
        this.blogs = blogs
        this.currentPage = page_id
      })
    },

    setPage(new_page) {
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
  font-family: Arial, Helvetica, sans-serif;
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
  width: 100vw;
  height: 100%;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
}
h1{
  text-align: center;
}
.Cardlist {
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 2500px;
}
.Cardlist li{
  position: relative;
  width: 25%;
  padding: 2px;
  margin: 10px;
  box-sizing: border-box;
}

.Card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  height: auto;
  max-width: 400px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  background: rgba(221, 218, 218, 0.1);
  word-break: break-all;
}
.Card > h4 {
  margin: 20px;
}
.Card p {
  margin: 20px;
  font-weight: 300;
}
.readmore{
  margin: 0;
  justify-content: flex-end;
  opacity: 0;
  max-height: 20px;
}
.Card:hover{
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);
}
.Card:hover  a{
  color: blue;
  transition: all 0.5s ease;
}
.icon{
  display: none;
}
.Card:hover .icon{
  width: 5%;
  transition: all 0.5s ease;
}
.Card:hover .readmore{
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
.Card:hover ~ a{
  color:blue;
  transition: all 0.5s ease;
}
.tag-list {
  margin: 0 3vw;
}
a {
  text-decoration: none;
}
.Card-img{
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
.create{
  text-align: center;
}
@media screen and (max-width: 1280px){
  .ShowBlogs{
    width: 100%;
    height: 100%;
    margin-top: 6vh;
  }
  .Cardlist {
    list-style: none;
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 5%;
    flex-direction: column;
    flex-wrap: wrap;
    height: 2500px;
  }
  .Cardlist li{
    position: relative;
    width: 30%;
    padding: 2px;
    margin: 10px;
    box-sizing: border-box;
  }
  .Card:hover .icon{
    width: 5%;
  }
}
@media screen and (max-width: 650px) {
  .ShowBlogs {
    width: 100%;
    height: 100%;
  }
  .Cardlist {
    list-style: none;
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 10%;
    flex-direction: column;
    justify-content: center;
  }
  .Cardlist li{
    width: 100%;
    height: 120%;
  }
  .Card:hover .icon{
    width: 5%;
  }
  img{
    width: 100%;
    height: 40%;
  }
}
</style>
