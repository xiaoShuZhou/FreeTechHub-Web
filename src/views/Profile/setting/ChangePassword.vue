<template>
<div class="ChangePassword">
  <p>old password: <input type="password" v-model="oldpassword" maxlength="14" placeholder="6-14位数字&字母组合登录密码"/></p>
  <p>new password: <input type="password" v-model = "newpassword1"  maxlength="14" placeholder="6-14位数字&字母组合登录密码"/></p>
  <p> confirm password: <input type="password" v-model="compass"  maxlength="14" placeholder="6-14位数字&字母组合登录密码"/></p>
  <button @click="test">submit</button>

</div>
</template>

<script>
import User from '@/assets/utils/models/User'
// import axios from 'axios'
export default {
  name: 'ChangePassword',
  components: {

  },
  data() {
    return {
      oldpassword: '',
      newpassword1: '',
      compass: '',
    }
  },
  methods: {
    test(){
      // console.log('sasaas')
      // axios.post('http://127.0.0.1:8000/user/changepassword/', {oldpassword:this.oldpassword, newpassword1: this.newpassword1})
      //      .then(res=> {
      //          console.log(res.data.data)
      //        })
      // console.log(this.oldpassword)
      User.changepassword(this.oldpassword,this.newpassword1).then(context =>{
        console.log(context)
        })
    }
},
}
</script>
