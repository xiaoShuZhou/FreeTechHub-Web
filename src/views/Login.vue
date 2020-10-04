<template>
  <div class="Login">
    <link href="http://at.alicdn.com/t/font_1635546_5lsisygmqsg.css" rel="stylesheet" type="text/css" />
    <Navbar />
    <div class="loading" v-if="loading==true">
      <img src="@/assets/img/loading.gif" alt="loding">
      <h2>Logining in...</h2>
      <p>Because our server has trouble connecting to Github therefore, it is very likely that we will take many attempts until you logged in, and we will refresh this page if the server timeouts.</p>
      <p>if you want to use normal login in, click <a :href="'http://'+IP+':'+PORT+'/#/login/'">here.</a></p>
    </div>
    <div id="body" v-else>
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Register</h1>
            <Register />
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Login</h1>
            <div class="social-container">
              <a @click="githubLogin" class="social"><i class="iconfont icon-github" /></a>
            </div>
            <input type="text" v-model="username" required="" placeholder="username" autocomplete />
            <input type="password" v-model="password" required="" placeholder="password" autocomplete />
            <el-link type="primary" id="forgetpassword" tag="button" @click="forgetpassword">Forget Password</el-link>
            <button @click="login">Login</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left" style=" align-items: center;">
              <h1>One of us?</h1>
              <p>If you already has an account, just sign in. We've missed you!</p>
              <button class="ghost" id="signIn" @click="test">Sign Up</button>
            </div>
            <div class="overlay-panel overlay-right" style=" align-items: center;">
              <h1>New here?</h1>
              <p>Sign up and discover great amount of new opportunities!</p>
              <button class="ghost" id="signUp" @click="test">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, logout} from '@/assets/utils/auth'
import {getQueryParams} from '@/assets/utils/getQueryParams'
import Navbar from '@/components/Navbar.vue'
import Register from '@/views/Register.vue'
import axios from 'axios'
import BASE_URL from '@/assets/utils/consts'
import {IP, PORT} from '@/assets/utils/consts'
import WebSocketHandle from '@/assets/utils/WebSocketHandle'
import User from '@/assets/utils/models/User'

export default {
  name: "Login",
  components: {
    Navbar,
    Register
  },
  data(){
    return {
      username: '',
      password: '',
      loading: false,
      IP,
      PORT
    }
  },
  methods: {
    test(){
      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');
      signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
      signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
    },

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
      window.location.href = `https://github.com/login/oauth/authorize/?client_id=5ee059616c2412fba0e3&redirect_uri=http:%2F%2F${IP}:${PORT}%2F%23%2Flogin%2F`
    },

    githubAuth() {
      axios.post(`${BASE_URL}api/login/social/jwt/`, {
        "provider": "github",
        "code": getQueryParams("code")
      })
      .then(res => {
        axios.defaults.headers['Authorization'] = 'JWT ' + res.data.token
        localStorage.setItem("token", 'JWT ' + res.data.token);
        window.location.href = `http://${IP}:${PORT}/#/show/blogs/`
      })
      .catch(err => {
        if (err.message ==
              'Request failed with status code 401') {
          alert("your login token has expired, please login again.")
          logout()
        } else if (err.message ==
              'Request failed with status code 400') {
          // if 400 bad request probably because timeout, just try again.
          this.githubLogin()
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
/* reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
h1 {
  font-weight: bold;
  margin: 0;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
/* container */
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 520px;
}
.form-container form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.social-container {
  margin: 10px 0;
}
.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
}
button {
  border-radius: 20px;
  border: 1px solid black;
  background: black;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
button.ghost {
  background: transparent;
  border-color: #fff;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-out;
}
/* sign in */
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
/* sign up */
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
/* overlay-container */
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.overlay {
  background: black;
  background: linear-gradient(to right, black, black) no-repeat 0 0/cover;
  color: #fff;
  height: 100%;
  width: 200%;
  position: relative;
  left: -100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 0 40px;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.overlay-left {
  transform: translateX(-20%);
}
/* animation */
/* move sign in to the right */
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
/* move overlay to left */
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
/* bring sign up over sign in */
.container.right-panel-active .sign-up-container {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
}
/* move overlay back to right */
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
#forgetpassword {
  color: #000
}

.Login {
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 500px;
  height: 500px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(19, 18, 18, 0.5);
  background: rgba(199, 148, 148, 0.8);
}
.box .inputbox {
  position: relative;
}
.box .inputbox input {
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
.box .inputbox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  color: #FFFFFF;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputbox input:focus~label,
.box .inputbox input:valid~label {
  top: -20px;
  left: 0;
  color: #3279db;
  font-size: 16px;
}
.buttongroup {
  text-align: center;
}
a {
  text-align: center;
  text-decoration: none;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .box {
    width: 100vw;
    height: auto;
    margin-left: 0;
  }
}
</style>
