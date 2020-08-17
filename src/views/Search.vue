<template>
  <div class="Search">
    <Navbar/>
    
    <div class="result" v-if="this.blogs.length != 0">
      <div class="blogs">
        <h2>Related blogs:</h2>
        <ul class="cardlist">
          <li v-for="blog in blogs" :key="blog.pk">
            <div class="card">
              <img class="card-img" src="@/assets/img/landing.jpg" alt="">
              <h3 class="title"><router-link :to="{name: 'ShowBlog', params: {id: blog.pk}}" >{{ blog.title }}</router-link></h3>
              <div class="user">
                <img class="avatar" src="@/assets/img/头像 女孩.svg">
                <a href="">用户名</a>
              </div>
              <h4>Tags: </h4>
              <ul class="tag-list">
                <li v-for="tag in blog.tags" :key="tag.pk">{{tag.tag_name}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2 v-else>No related blogs</h2>

    <div class="questions" v-if="this.questions.length != 0">
      <h2>Related questions:</h2>
      <ul>
        <li v-for="question in questions" :key="question.pk">
          <div class="card">
            <h3 class="title"><router-link :to="{name: 'ShowQuestion', params: {id: question.pk}}" >{{ question.title }}</router-link></h3>
            <h4>Tags: </h4>
            <ul class="tag-list">
              <li v-for="tag in question.tags" :key="tag.pk">{{tag.tag_name}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <h2 v-else>No related questions</h2>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Tag from '@/assets/utils/models/Tag'

export default {
  name: "Search",
  components: {
    Navbar
  },
  data() {
    return {
      blogs: '',
      questions: ''
    }
  },
  methods: {
    
  },
  created() {
    let tag = new Tag({tag_name: this.$route.query['tag_name']})
    tag.get_tagged_items().then(res => {
      this.blogs = res.blogs
      this.questions = res.questions
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cardlist {
  list-style: none;
  display: grid;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  transition: all 0.5s ease;
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
}
.card-img{
  width: 100%;
  height: 50%;
}
.card > h4 {
  margin: 0 3vw;
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
}
.card:hover {
  box-shadow: 0 12px 24px 0 rgba(0,0,0,0.2);
}

.title {
  align-self: center;
  margin: 3vh 0;
}

.tag-list {
  margin: 0 3vw;
}
@media screen and (max-width: 1280px){
  .ShowOneSeries{
    width: 100%;
    height: 100%;
  }
  .cardlist {
    list-style: none;
    display: grid;
    width: 100%;
    height: 100%;
    margin-top: 5%;
    grid-template-columns: 50% 50%;
    grid-column-gap: 20px;
  }
  .cardlist li{
    max-height: 60vh;
    margin: 2vh 0;
  }
  .card:hover .icon{
    width: 5%;
  }
}
@media screen and (max-width: 650px) {
  .ShowOneSeries {
    width: 100%;
    height: 100%;
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