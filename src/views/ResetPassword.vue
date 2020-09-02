<template>
  <div class="ResetPassword">
    <Navbar/>
    <div class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
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
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import User from '@/assets/utils/models/User'
export default {
  name: "RestPassword",
  components: {
    Navbar,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,14}');
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else if(reg.test(value)===false){
        callback(new Error('a minimum of 3 character sets from these classes: [letters], [numbers], [special characters]'));
      }else {
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
        pass : '',
        checkPass : '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
    }
  };
},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          User.resetpassword(this.ruleForm.pass, this.$route.params.id).then(() =>{
            this.$notify({
              title: 'Successfully changed',
              type: 'success'
            });
            this.$router.push({name: "Login"})
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
  },
}
</script>
<style scoped>
.ResetPassword{
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
  height: 400px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(19, 18, 18, 0.5);
  background: rgba(199, 148, 148, 0.8);
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .inputbox {
  position: relative;
  width: 100%;
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
  color: #ffffff;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label {
  top: -20px;
  left: 0;
  color: #3279db;
  font-size: 16px;
}
button {
  background: transparent;
  border: none;
  color: #ffffff;
  background-color: #03a9f4;
  padding: 10px 20px;
  margin: 0 10px;
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
  .box{
    width: 100vw;
    height: auto;
    margin-left: 0;
  }
}
</style>
