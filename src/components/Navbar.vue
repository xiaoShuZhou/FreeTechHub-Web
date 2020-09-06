<template>
  <div class="navbar" id="navbar">
    <router-link class="logo" to="/">FreeTechHub</router-link>
    <ul class="navbar-list" :class="{shownavbar: show}">
      <li>
        <router-link class="list-logo" to="/">FreeTechHub</router-link>
      </li>
      <li>
        <router-link class="list" to="/show/blogs">blogs</router-link>
      </li>
      <li>
        <router-link class="list" to="/show/series">series</router-link>
      </li>
      <li>
        <router-link class="list" to="/show/questions">questions</router-link>
      </li>
      <li v-if="is_login">
        <router-link :to="{name:'ProfileInformation', params:{id: user_id}}">Profile</router-link>
      </li>
      <li class="search">
        <input type="text" name="search" v-model="keywords" placeholder="Search" @enter="search"/>
        <button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></button>
      </li>
      <li>
        <router-link v-if="is_login" to="/login">Logout</router-link>
        <router-link v-else to="/login">Login</router-link>
      </li>
    </ul>
    <div @click="shownavbar"><img class="expand" src="@/assets/img/Expand.svg" alt=""></div>
  </div>
</template>

<script>
import {is_authenticated} from '@/assets/utils/auth'
export default {
  name: "Navbar",
  props:['_user'],
  data() {
    return {
      keywords: '',
      is_login: false,
      user: this._user,
      show: false
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
    shownavbar(){
      this.show = ! this.show
    }
  },
  created() {
    is_authenticated(this).then(res => {
      if (res == true) {
        this.is_login = true
      }
    })
  },
  computed: {
    user_id() {
      return this.$store.state.user.pk
    }
  }
}
</script>

<style  scoped>
#profile{
  color:#fff
}
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.navbar{
  margin: 0;
  padding: 0;
  background-color: #ffdcc9;
  width: 100%;
  position: fixed;
  top: 0;
  height: 10vh;
  z-index: 5;
  left: 0;
}
.logo{
  display: none;
}
.navbar-list{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  list-style: none;
}
li:nth-child(1){
  margin-left: 5vw;
}
input{
  border-radius: 10px;
  outline: none;
  font-size: 24px;
  height: 40px;
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
.list{
  width: 200px;
}
.list-logo {
  color: rgb(32, 78, 207) !important;
  font-size: 32px;
}
li:nth-last-child(1){
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
li:hover{
  /* width: 100%; */
  max-width: 200px;
  /* height: 40px; */
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  background: #fe6b40;
  transition: all 0.5s ease;
}
li:nth-last-child(1):hover{
  background: rgb(3, 224, 147);
  color: white;
}
a:-webkit-any-link{
  color: black;
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
  cursor: pointer;
}
.search{
  display: flex;
}
@media screen and (max-width: 1025px){
  .expand{
    display: inline;
  }
  .logo{
    display: inline;
    color: rgb(32, 78, 207) !important;
    font-size: 32px;
  }
  li:nth-child(1){
    display: none !important;
  }
  .navbar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 6vh;
    text-align: center;
  }
  .navbar-list{
    position: absolute;
    left: -50vw;
    top: 6vh;
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #ffdcc9;
    transition: all 0.5s ease-in-out;
  }
  .shownavbar{
    left: 0 !important;
    width: 30vw !important;
  }
  .navbar-list li{
    width: 100%;
    padding: 0;
  }
  li:hover{
    width: 100%;
    height: 50%;
    max-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li:nth-last-child(1){
    width: 100px;
    height: 60px;
    cursor: pointer;
    padding: 0;
    margin-bottom: 50px;
  }
  li:nth-last-child(1){
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 60px;
  }
  li:nth-last-child(2):hover{
    background: none;
  }
  input{
    width: 100%;
    height: 100%;
  }
  .search{
    display: flex!important;
    width: 100%;
    margin: 0;
    justify-content: space-around;
    align-items: baseline;
  }
}
</style>
