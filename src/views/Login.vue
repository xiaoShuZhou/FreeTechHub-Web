<template>
  <div class="Login">
    <Navbar/>
    <div class="loading" v-if="loading==true">
      <img src="@/assets/img/loading.gif" alt="loding">
      <h2>Logining in...</h2>
      <p>Because our server has trouble connecting to Github therefore, it is very likely that we will take many attempts until you logged in, and we will refresh this page if the server timeouts.</p>
      <p>if you want to use normal login in, click <a :href="'http://'+IP+':8080/#/login/'" >here.</a></p>
    </div>
    <div class="box" v-else>
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
        <button @click="githubLogin">Github</button>
      </div>
      <router-link tag="button" to="/register">register</router-link>
      <a id="forgetpassword" tag="button" @click="forgetpassword">Forget Password</a>
    </div>
  </div>
</template>

<script>
import {login, logout} from '@/assets/utils/auth'
import {getQueryParams} from '@/assets/utils/getQueryParams'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
import {IP} from '@/assets/utils/consts'
import WebSocketHandle from '@/assets/utils/WebSocketHandle'
import User from '@/assets/utils/models/User'

export default {
  name: "Login",
  components: {
    Navbar
  },
  data(){
    return {
      username: '',
      password: '',
      loading: false,
      IP
    }
  },
  methods: {
    login: async function() {
      try{
        let user = await login(this.username, this.password)
        this.$store.commit("setSocketHandle", new WebSocketHandle(user.pk))
        this.$router.push({name: "ShowBlogs"})
      } catch(err) {
        alert('Wrong passowrd or username!')
      }
    },

    logout: function() {
      logout()
      this.$store.commit("removeSocketHandle")
      this.$router.push({name: "ShowBlogs"})
    },

    githubLogin() {
      window.location.href = "https://github.com/login/oauth/authorize/?client_id=5ee059616c2412fba0e3&redirect_uri=http:%2F%2F127.0.0.1:8080%2F%23%2Flogin%2F"
    },

    githubAuth() {
      axios.post(`http://${IP}:8000/api/login/social/jwt/`, {
        "provider": "github",
        "code": getQueryParams("code")
      })
      .then(res => {
        axios.defaults.headers['Authorization'] = 'JWT ' + res.data.token
        localStorage.setItem("token", 'JWT ' + res.data.token);
        window.location.href = `http://${IP}:8080/#/show/blogs/`
      })
      .catch(err => {
        if (err.message ==
              'Request failed with status code 401') {
          alert("your login token has expired, please login again.")
          logout()
        } else if (err.message ==
              'Request failed with status code 400') {
          // if 400 bad request probably because timeout, just try again.
          window.location.href = "https://github.com/login/oauth/authorize/?client_id=5ee059616c2412fba0e3&redirect_uri=http:%2F%2F127.0.0.1:8080%2F%23%2Flogin%2F"
        }
      })
    },
    forgetpassword() {
      this.$prompt('Please enter your email', 'Warning', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'Incorrect email format'
      }).then(({ value }) => {
        User.forgetpassword(value).then(() => {
          this.$message({
            type: 'success',
            message: 'Successfully send'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancel'
        });
      });
    }

  },
  created() {
    if (getQueryParams("code") != null) {
      this.loading = true
      this.githubAuth()
    }
  }
}
</script>

<style scoped>
#forgetpassword{
  color:#fff
}
.Login{
	margin: 0;
	padding: 0;
  height: 100vh;
	font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
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

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .box{
    width: 100vw;
    height: auto;
    margin-left: 0;
  }
}
</style>
