<template>
  <div class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/show/blogs">blogs</router-link> |
    <router-link to="/show/series">series</router-link> |
    <router-link to="/show/questions">questions</router-link> |
    <router-link to="/login">Login</router-link> |
    <button @click='goProfile'>Profile</button>
    <input type="text" name="search" v-model="search_tag_name"/>
    <button @click="search">search</button>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'

export default {
  name: "Navbar",
  data() {
    return {
      search_tag_name: '',
    }
  },
  methods: {

    goProfile() {
      User.getSelf().then(user =>{
        this.$router.push({name:"ShowProfile", params:{id: user.pk}})
        })
    },
    search() {
      if (
        this.search != '' &&
        this.$route.query.tag_name != this.search_tag_name
      ) {
        this.$router.push({
          name: "Search",
          query: { tag_name: this.search_tag_name },
        })
      }
    }
  }
}
</script>

<style  scoped>
</style>
