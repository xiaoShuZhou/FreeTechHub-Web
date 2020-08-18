<template>
  <div class="navbar" id="navbar">
    <router-link to="/">FreeTechHub</router-link>
    <router-link class="list" to="/about">About</router-link> 
    <router-link class="list" to="/show/blogs">blogs</router-link> 
    <router-link class="list" to="/show/series">series</router-link> 
    <router-link class="list" to="/show/questions">questions</router-link> 
    <a class="list" @click="goProfile()">Profile</a>
    <input type="text" name="search" v-model="keywords" placeholder="Search"/>
    <button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></button>
    <img class="expand" src="@/assets/img/Expand.svg" alt="">
    <router-link v-if="is_login" to="/login">Logout</router-link> 
    <router-link v-else to="/login">Login</router-link>
  </div>
</template>

<script>
import {is_authenticated, login_required} from '@/assets/utils/auth'
export default {
  name: "Navbar",
  data() {
    return {
      keywords: '',
      is_login: false,
      user: '',
    }
  },
  methods: {
    search() {
      if (this.keywords != this.$route.query.keywords) {
        this.$router.push({
          name: "Search",
          query: { keywords: this.keywords }
        })
      }
    },
    goProfile() {
      login_required(this, user => {
        this.$router.push(
          {name:'ProfileInformation', params:{id: user.pk}}
        )
      })
    }
  },
  created() {
    is_authenticated(this).then(res => {
      if (res == true) {
        this.is_login = true
      }
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
  height: 10vh;
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
  font-size: 32px;
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
@media screen and (max-width: 1280px){
  .expand{
  display: inline;
  }
}
</style>
