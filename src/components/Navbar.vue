<template>
  <div class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/show/blogs">blogs</router-link> |
    <router-link to="/show/series">series</router-link> |
    <router-link to="/show/questions">questions</router-link> |
    <router-link to="/login">Login</router-link> |
    <input type="text" name="search" v-model="search_tag_name"/>
    <button @click="search">search</button>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      search_tag_name: ''
    }
  },
  methods: {
    search() {
      if (this.search != '' && this.$route.query.tag_name != this.search_tag_name){
        this.$router.push({name: "Search", query: {tag_name: this.search_tag_name} })
      }
    }
  }
}
</script>

<style>

</style>