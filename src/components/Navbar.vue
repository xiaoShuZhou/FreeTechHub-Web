<template>
  <div class="navbar" id="navbar">
    <router-link to="/">FreeTechHub</router-link>
    <router-link class="list" to="/about">About</router-link> 
    <router-link class="list" to="/show/blogs">blogs</router-link> 
    <router-link class="list" to="/show/series">series</router-link> 
    <router-link class="list" to="/show/questions">questions</router-link> 
    <router-link class="list" to="/profile">Profile</router-link>
    <router-link class="list" :to="{name:'ProfileInformation', params:{id: user.pk}}">Profile</router-link>
    <input type="text" name="search" v-model="search_tag_name" placeholder="Search"/>
    <button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></button>
    <img class="expand" src="@/assets/img/Expand.svg" alt="">
    <router-link to="/login">Login</router-link> 
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'

export default {
  name: "Navbar",
  data() {
    return {
      search_tag_name: '',
      user: '',
    }
  },
  methods: {
    search() {
      if (
        this.search != '' &&
        this.$route.query.tag_name != this.search_tag_name
      ) {
        this.$router.push({
          name: "Search",
          query: { tag_name: this.search_tag_name },
        })
      }
    }
  },
  mounted() {
    User.getSelf().then(user =>{
    this.user= user
    })
  },
}
</script>

<style  scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.navbar{
  margin: 0;
  padding: 0;
  width: 100%;
  position: fixed;
  background-color: #ffdcc9;
  display: flex;
  left: 0;
  align-items: center;
  font-size: 24px;
  height: 64px;
  z-index: 5;
  top: 0;
}
input{
  border-radius: 10px;
  outline: none;
  font-size: 24px;
}
input::-webkit-input-placeholder{
	color: #000000;
	text-align: center;
}
input::-moz-placeholder{
	color: #000000;
	text-align: center;
}
input:focus::-webkit-input-placeholder{
  color: transparent;
}
button{
  background: transparent;
  border: none;
  outline: none;
  border-radius: 20%;
}
button:hover{
  background: aqua;
}
img{
  width: 30px;
  height: 30px;
}
#login{
  border-right: 0px !important;
  color: #000;
}
a{
  padding: 0 10px 0 10px;
	margin: 0 10px 0;
}
a:nth-child(1) {
  color: rgb(32, 78, 207) !important;
  font-size: 24px;
}
a:nth-last-child(1){
  background-color: rgb(0, 204, 131);
  width: 100px;
  height: 40px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  padding-top: 10px;
  font-size: 18px;
  margin-left: 10%;
}
a:hover{
  width: 100%;
  max-width: 200px;
  height: 40px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  background: #fe6b40;
  transition: all 0.5s ease;
}
a:-webkit-any-link{
  color: white;
}
.router-link-exact-active{
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
	background: #fe6b40;
}
.expand{
  width: 100%;
  float: right;
  display: none;
}
@media screen and (max-width: 1025px){
  .expand{
  display: inline;
  }
}
</style>
