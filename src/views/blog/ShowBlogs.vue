<template>
  <div class="ShowBlogs">
    <Navbar/>
    <h1>Blogs</h1>
    <ul class="cardlist">
      <li v-for="blog in blogs" :key="blog.pk">
        <div class="card">
          <img src="@/assets/img/landing.jpg" alt="">
          <h3 class="title">
            <router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >
              {{ blog.title }}
            </router-link>
          </h3>
          <h4>Tags: </h4>
          <ul class="tag-list">
            <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
          </ul>
          <p>{{blog.content | stringfilter}}</p>
          <p>CONTINUE READING<img class="icon" src="@/assets/img/向右.svg" alt=""></p>
        </div>
      </li>
    </ul>
    <button @click="newBlog">create new blog</button>
    <Footer/>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import { is_authenticated, login_required } from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "ShowBlog",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      blogs: '',
      totalpage:[],
      pagesize: 9,
      pagenumber: 1,
      blogshow: '',
      currentpage: 0,
    }
  },
  methods: {
    newBlog() {
      login_required()
      .then(() => this.$router.push({name: 'NewBlog'}))
    },
  },
  created() {
    is_authenticated(this).then(() => {
      Blog.all().then(blogs => this.blogs = blogs)
    })
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
}

.ShowBlogs {
  width: 100%;
  height: 200vh;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 200vh;
  margin-top: 5%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}
.cardlist li{
  margin: 2vh 2vw;
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
}

.card > h4 {
  margin: 0 3vw;
}
.card > p {
  padding: 10px 3vw 0 3vw;
  font-weight: 300;
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}
.card:hover  a{
  color: blue;
  transition: all 0.5s ease;
}
.card:hover .icon{
  width: 30%;
}
.card:hover p:nth-last-child(1){
  width: 100%;
  display: block;
  text-align: right;
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
.card p:nth-last-child(1){
  display: none;
}
.tag-list {
  margin: 0 3vw;
}

a {
  text-decoration: none;
}
img{
  width: 100%;
  height: 40%;
}
@media screen and (max-width: 1025px){
  .ShowBlogs{
    width: 100%;
    height: 100%;
    padding: 0 10vw;
  }
  .cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 200vh;
  margin-top: 5%;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(3, 33.3%);
  }
  .cardlist li{
    max-height: 60vh;
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
