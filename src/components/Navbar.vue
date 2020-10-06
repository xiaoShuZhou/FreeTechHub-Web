<template>
  <div class="navbar" id="navbar">
    <router-link class="logo" to="/"><el-link type="primary">FreeTechHub</el-link></router-link>
    <el-menu class="el-menu-demo navbar-list" mode="horizontal" :class="{shownavbar: show}">
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
        <el-input type="text" name="search" v-model="keywords" placeholder="Search" @enter="search"/>
        <el-button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></el-button>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link  v-if="is_login" to="/login"><el-button>Logout</el-button></router-link>
        <router-link round  v-else to="/login"><el-button>Login</el-button></router-link>
      </el-menu-item>
    </el-menu>
    <div @click="shownavbar"><img class="expand" src="@/assets/img/Expand.svg" alt=""></div>
  </div>
</template>

<script>
import {is_authenticated} from "@/assets/utils/auth"
export default {
  name: "Navbar",
  data() {
    return {
      is_login: false,
      show: false
    }
  }
  ,
  methods: {
    shownavbar(){
      this.show = !this.show

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
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
<<<<<<< HEAD
  font-family: Tahoma, Arial, "Hiragino Sans GB", simsun, sans-serif;
  font-size: 20px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}
/*nav {*/
/*  background: #c99774;*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  padding: 0 3em 1em 3em;*/
/*  position: relative;*/
/*  z-index: 10;*/
/*}*/
.el-menu-demo {
    border-bottom:none!important;
}
/*nav a {*/
/*  text-decoration: none;*/
/*  display: inline-block;*/
/*  color: aliceblue;*/
/*  padding: 10px;*/
/*}*/
.loge{
  margin-top: 15px;
}
.el-menu--horizontal{
  border-bottom: none;
}
/*.nav .menu{*/
/*  float: right;*/
/*	flex: 7;*/
/*	height: 100%;*/
/*	color: #f3f3f3;*/
/*	display: flex;*/
/*	align-items: center;*/
/*	justify-content: space-between;*/
/*	font-size: 20px;*/
/*	padding-left: 200px;*/
/*}*/
.menu-logo ,.menu-btn{
	display: none;
}
@media screen and (max-width: 850px) {
	.nav{
		box-shadow: unset;
		transition: all 0.5s;
    display: flex;
    justify-content: space-between;
    height: 100%;
	}
	.nav.active{
		background: #000;
		box-shadow: 0 0 10px rgba(0,0,0,0.5);
	}
	.nav .logo{
		text-align: center;
	}
	.menu-btn{
		color: #eeeeee;
		display: flex;
		align-items: center;
		justify-content: center;
    min-width: 100px;
    cursor: pointer;
	}
	.menu-btn .iconfont{
		width: 18%;
	}
	.menu .menu-logo{
		width: 100%;
		height: 80px;
		line-height: 80px;
		display: block;
		font-size: 35px;
		color: #FFFFFF;
		background-color: #1f1f1f;
		text-align: center;
	}
	.nav .menu{
		position: absolute;
		left: -101vw;
		top: 0;
		width: 80vw;
		height: 100vh;
		padding: 0;
		font-size: 22px;
		color: #fff;
		background: #1F1F1F;
		display: flex;
		justify-content: unset;
		align-items: center;
		flex-direction: column;
		transition: all 0.5s ease-in-out;
	}
  .shownavbar{
		left: -10vw !important;
		width: 40vw !important;
=======
  text-decoration: none;
}
.navbar{
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
.navbar-list{
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
  .navbar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 6vh;
    text-align: center;
    z-index: 3;
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
>>>>>>> 19351d226339d4af631218bfbe6566968d294098
  }
	.menu li{
		display: block;
		width: 50%;
		height: 30px;
		margin: 0 auto;
		text-align: center;
		margin-bottom: 35px;
	}
}
</style>

<style>
  nav {
  background: #c99774;
  display: flex;
  justify-content: space-between;
  padding: 0 3em 1em 3em;
  position: relative;
  z-index: 10;
}
  nav a {
  text-decoration: none;
  display: inline-block;
  color: aliceblue;
  padding: 10px;
}
  .nav .menu{
  float: right;
	flex: 7;
	height: 100%;
	color: #f3f3f3;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 20px;
	padding-left: 200px;
}
</style>