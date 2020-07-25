<template>
  <div class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/show/blogs">blogs</router-link> |
    <router-link to="/show/questions">questions</router-link> |
    <router-link to="/login">Login</router-link> |
    <label>Search</label>
    <input type="text" name="search" v-model="search"/>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style>

</style>