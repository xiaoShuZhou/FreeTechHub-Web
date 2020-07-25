<template>
  <div class="Login">
    <Navbar/>
    <div><span>name: <input type="text" v-model="username"/></span></div>
    <div><span>password: <input type="password" v-model="password"/></span></div>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
    <router-link to="/register">register</router-link>
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
    logout: function() { logout() },
  }
}
</script>

<style scoped>

</style>
