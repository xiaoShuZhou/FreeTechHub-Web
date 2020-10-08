<template>
  <div class="Navbar" id="Navbar">
    <router-link class="logo" to="/"><el-link type="primary">FreeTechHub</el-link></router-link>
    <el-menu class="el-menu-demo Navbar-list" mode="horizontal" :class="{showNavbar: show}">
      <el-menu-item index="1">
        <router-link to="/"><el-link class="list-logo" type="primary">FreeTechHub</el-link></router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link class="list" to="/show/blogs"><el-link target="_blank">blogs</el-link></router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link class="list" to="/show/series"><el-link target="_blank">series</el-link></router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link class="list" to="/show/questions"><el-link target="_blank">questions</el-link></router-link>
      </el-menu-item>
      <el-menu-item index="5" v-if="is_login">
        <router-link :to="{name:'ProfileInformation', params:{id: user_id}}"><el-link target="_blank">Profile</el-link></router-link>
      </el-menu-item>
      <el-menu-item index="6" class="search">
        <el-input 
          v-model="keywords" 
          type="text" 
          @keyup.native.space="keywords= keywords+ ' '"
          clearable
          autofocus>
        </el-input>
        <el-button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></el-button>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link v-if="is_login" to="/login"><el-button @click="logout()">Logout</el-button></router-link>
        <router-link round v-else to="/login"><el-button >Login</el-button></router-link>
      </el-menu-item>
    </el-menu>
    <div @click="showNavbar"><img class="expand" src="@/assets/img/Expand.svg" alt=""></div>
  </div>
</template>

<script>
import {is_authenticated, logout} from '@/assets/utils/auth'
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
    logout() {
      logout()
      this.is_login = false
    },
    search() {
      if (this.keywords != this.$route.query.keywords) {
        this.$router.push({
          name: "Search",
          query: { keywords: this.keywords }
        })
      }
    },
    showNavbar(){
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
.Navbar{
  margin: 0;
  padding: 0;
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
.Navbar-list{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px !important;
  list-style: none;
}
li:nth-child(1){
  margin-left: 5vw;
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
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  padding-top: 10px;
  font-size: 18px;
  margin-left: 10%;
}
li:hover{
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  transition: all 0.5s ease;
}
a:-webkit-any-link{
  color: black;
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
img{
  width: 30px;
  height: 30px;
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
  .Navbar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 6vh;
    text-align: center;
    z-index: 3;
  }
  .Navbar-list{
    position: absolute;
    left: -50vw;
    top: 6vh;
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transition: all 0.5s ease-in-out;
  }
  .showNavbar{
    left: 0 !important;
    width: 30vw !important;
  }
  .Navbar-list li{
    width: 100%;
    padding: 0;
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
