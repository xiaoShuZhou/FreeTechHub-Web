<template>
<div class="Register">
  <Navbar />
  <div class="box">
    <form>
      <div class="inputbox">
        <input type="text" v-model= 'username' @blur="validate_username" required=""/>
        <label>Username：</label>
      </div>
        
      <div class="inputbox">
        <input type="email" v-model="email" @blur="validate_email" required=""/>
        <label>Email：</label>
        <p id="test_user"></p>
      </div>
        
      <div class="inputbox">
        <input type="password" v-model="password1"  @blur="validate_password" required=""/>
        <label>Password1：</label>
        <p id="test_user"></p>
      </div>
      <div class="buttongroup">
        <router-link tag="button" to="/login">Login</router-link>
        <button @click="githubLogin">Github</button>
      </div>
    </form>
  </div>
  
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  Name: "Register",
  components: {
    Navbar
  },
  data() {
    return {
      username:'',
      email: '',
      password1:'',
      password2:''
    }
  },
  methods: {
    validate_username() {
      console.log(this.username.length)
      if(this.username.length>10||this.username.length<1)
      {
        alert('Length must be between 1 and 10 characters')
      }

    },
    validate_required(field, alerttxt) {
        if (field == null || field == "") {
          alert(alerttxt);
          return false
        } else {
          return true
        }
    },
    validate_email() {
      console.log(this.email.length)
      //定义正则表达式的变量:邮箱正则
      var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      //console.log(username);
      if (this.validate_required(this.email,"Email must be filled out!") && this.email.search(emailReg) != -1) {
        document.getElementById("test_user").innerHTML = "<font color='green' size='3px'>√</font>";
      } else {
        document.getElementById("test_user").innerHTML = "<font color='red' size='3px'>email formatis error</font>";
      }
    },
    validate_password(){
      console.log('ddsss')
      var passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,14}$/;
      if(this.validate_required(this.password1, "password must be filled out!")  && this.password1.search(passwordReg) != -1)
      {
        // document.getElementById("test_pw").innerHTML = "<font color='green' size='3px'>√</font>";
                // alert("√");
      }else{
        // document.getElementById("test_pw").innerHTML = "<font color='red' size='3px'>password formatis error</font>";
        alert("Your password complexity is too low");
     }
  },
}
}
</script>

<style scoped>
.Register{
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
