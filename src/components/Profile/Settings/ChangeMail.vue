<template>
  <div>
    <div id class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <div id class="inputbox">
          <el-form-item label="OldPassword" prop="oldpass">
            <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div id class="inputbox">
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </div>
        <div id class="inputbox">
          <el-form-item label="Confirm" prop="checkemail">
            <el-input type="email" v-model="ruleForm.checkemail" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: 'ChangeMail',
  data() {
    var validateOldpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your oldpassword'));
      } else {
        User.checkpassword(value).then(res => {
          if (res == "false") {
            callback(new Error('The old password is incorrect'));
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
    var validateEmail2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please type your new Email again.'));
      } else if (value !== this.ruleForm.email) {
        callback(new Error('The two email you typed do not match.'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: '',
        email: '',
        checkemail: '',
      },
      rules: {
        oldpass: [{
          validator: validateOldpass,
          trigger: 'blur'
        }],
        email: [{
          validator: validateEmail,
          trigger: 'blur'
        }],
        checkemail: [{
          validator: validateEmail2,
          trigger: 'blur'
        }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          User.changeemail(this.ruleForm.oldpass, this.ruleForm.email).then(() => {
            this.$notify({
              title: 'Successfully changed',
              type: 'success'
            });
            this.$router.push({
              name: "Login"
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
  }
}
</script>

<style scoped>
.box {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  bottom: 15%;
}
</style>
