<template>
<div class="Register">
  <Navbar />
  <form>
    <table>
      <tr>
        <td>Username：</td>
        <td><input type="text" v-model= 'username' @blur="validate_username" /></td>
      </tr>

      <tr>
        <td>Email：</td>
        <td><input type="email" v-model="email" @blur="validate_email"/></td>
        <td id="test_user"></td>
      </tr>

      <tr>
        <td>Password1：</td>
        <td><input type="password" v-model="password1"  @blur="validate_password"/></td>
        <td id="test_user"></td>
      </tr>

    </table>
  </form>
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
