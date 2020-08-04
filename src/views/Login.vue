<template>
  <div class="Login">
    <Navbar/>
    <div class="box">
      <form>
        <div class="inputbox">
          <input type="text" v-model="username" required=""/>
          <label>name: </label>
        </div>
        <div class="inputbox">
          <input type="password" v-model="password" required=""/>
          <label>password: </label>
        </div>
      </form>
      <div class="buttongroup">
        <button @click="login">Login</button>
        <button @click="logout">Logout</button>
      </div>
      <router-link to="/register">register</router-link>
    </div>
  </div>
</template>

<script>

import {login, logout} from '@/assets/utils/auth'
import Navbar from '@/components/Navbar.vue'
export default {
  name: "Login",
  components: {
    Navbar
  },
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: async function() { 
      try{
        await login(this.username, this.password)
        this.$router.push({name: "ShowBlogs"})
      } catch(err) {
        alert('Wrong passowrd or username!')
      }
    },
    logout: function() { 
      logout()
      this.$router.push({name: "ShowBlogs"})
    },
  }
}
</script>

<style scoped>
.Login{
	margin: 0;
	padding: 0;
	font-family: sans-serif;
  
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 8%;
	margin-left: 35%;
	width: 500px;
  height: 400px;
	padding: 40px;
	box-sizing: border-box;
  border-radius: 20px;
	box-shadow: 0 15px 25px rgba(19, 18, 18, 0.5);
  background: rgba(199, 148, 148, 0.8);
}

.box .inputbox{
	position: relative;
}

.box .inputbox input{
	width: 100%;
	padding: 10px 0;
	font-size: 20px;
	color: #fff;
	letter-spacing: 1px;
	margin-bottom: 30px;
	border: none;
	border-bottom: 1px solid #fff;
	outline: none;
	background: transparent;
}
.box .inputbox label{
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px 0;
	letter-spacing: 1px;
	color: #FFFFFF;
	pointer-events: none;
	transition: 0.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label{
		top: -20px;
		left: 0;
		color: #3279db;
		font-size: 16px;
}
button{
  background: transparent;
	border: none;
	color: #FFFFFF;
	background-color: #03A9F4;
	padding: 10px 20px;
  margin: 0 10px 0 10px;
	cursor: pointer;
	border-radius: 5px;
}
.buttongroup{
  text-align: center;
}
a{
  text-align: center;
  text-decoration: none;
}
</style>
