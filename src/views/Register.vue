<template>
<div class="Register">
  <Navbar />
  <div class="box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <div class="inputbox">
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username" maxlength="10" show-word-limit></el-input>
        </el-form-item>
      </div>
      <div class="inputbox">
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
      </div>
      <div class="inputbox">
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="inputbox">
        <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
        <router-link tag="button" to="/login">Login</router-link>
        <button @click="githubLogin">Github</button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {login } from '@/assets/utils/auth'
import WebSocketHandle from '@/assets/utils/WebSocketHandle'
import User from '@/assets/utils/models/User'
import Navbar from "@/components/Navbar.vue";
export default {
  Name: "Register",
  components: {
    Navbar,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your username'));
      } else {
        var type = "username"
        User.checkrepeat(value, type).then(res => {
          if (res.count > 0) {
            callback(new Error('User name already exists'));
          } else {
            callback();
          }
        })
      }
    };
    var validateEmail = (rule, value, callback) => {
      var apos = value.indexOf("@")
      var dotpos = value.lastIndexOf(".")
      if (value === '') {
        callback(new Error('Please enter your email'));
      } else if (apos < 1 || dotpos - apos < 2) {
        callback(new Error('Please enter the correct email address'));
      } else {
        var type = "email"
        User.checkrepeat(value, type).then(res => {
          if (res.count > 0) {
            callback(new Error('Email name already exists'));
          } else {
            callback();
          }
        })
      }
    };
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,14}');
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else if (reg.test(value) === false) {
        callback(new Error('a minimum of 3 character sets from these classes: [letters], [numbers], [special characters]'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please type your new password again.'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('The two passwords you typed do not match.'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        email: [{
          validator: validateEmail,
          trigger: 'blur'
        }],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],

      }
    };
  },
  methods: {
    login: async function() {
      try{
        let user = await login(this.ruleForm.username, this.ruleForm.pass)
        this.$store.commit("setSocketHandle", new WebSocketHandle(user.pk))
        this.$router.push({name: "ShowBlogs"})
      } catch(err) {
        alert('Wrong passowrd or username!')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          User.register(this.ruleForm.username, this.ruleForm.email, this.ruleForm.pass).then(() => {
            this.login()
            this.$notify({
              title: 'Successfully registered',
              type: 'success'
            });
            this.$router.push({
              name: "ShowBlogs"
            })
          })
        } else {
          this.$message({
            showClose: true,
            message: 'Please fill out the form correctly',
            type: 'error'
          });
          return false;
        }
      });
    },
    githubLogin() {
      window.location.href = "https://github.com/login/oauth/authorize/?client_id=5ee059616c2412fba0e3&redirect_uri=http:%2F%2F127.0.0.1:8080%2F%23%2Flogin%2F"
    },
  }
}
</script>

<style scoped>
.Register {
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
  height: 550px;
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

button {
  background: transparent;
  border: none;
  color: #FFFFFF;
  background-color: #03A9F4;
  padding: 10px 20px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  border-radius: 5px;
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
