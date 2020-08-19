<template>
  <nav class="nav">
    <router-link class="logo" to="/">FreeTechHub</router-link>
    <ul v-bind:class="{shownavbar:show}" class="menu">
      <li>
        <router-link class="menu-logo" to="/">FreeTechHub</router-link>
      </li>
      <li class="active">
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#series">Blog Series</a>
      </li>
      <li>
        <a href="#discussion">Questions</a>
      </li>
      <li v-if="is_login">
        <router-link :to="{name:'ProfileInformation', params:{id: user_id}}">Profile</router-link>
      </li>
      <li v-else>
        <router-link :to="{name:'Login'}">Login</router-link>
      </li>
    </ul>
    <div class="menu-btn" @click="shownavbar"><img class="iconfont" src="@/assets/img/菜单.svg" alt=""></div>
  </nav>
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
  font-family: Tahoma, Arial, "Hiragino Sans GB", simsun, sans-serif;
  font-size: 20px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

nav {
  background: #c99774;
  display: block;
  justify-content: space-between;
  padding: 0 3em 1em 3em;
  position: relative;
  z-index: 10;
}

nav ul {
  list-style-type: none;
}
nav ul li {
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 0.25rem solid transparent;
}
nav a {
  text-decoration: none;
  display: inline-block;
  color: aliceblue;
  padding: 10px;
}
nav ul li a:hover {
  background: cadetblue;
}
nav ul li a.active:hover,
a.active:visited {
  font-size: 27px;
  transition: 0.75s ease;
  border-bottom: 0.25rem solid blue;
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
