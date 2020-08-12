<template>
  <nav>
    <div>
      <router-link to="/">FreeTechHub</router-link>
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#series">Blog Series</a>
        </li>
        <li>
          <a href="#discussion">Questions</a>
        </li>
        <li v-if="is_login">
          <router-link :to="{name:'ProfileInformation', params:{id: user_id}}">Profile</router-link>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {is_authenticated} from "@/assets/utils/auth"

export default {
  name: "Navbar",
  data() { 
    return {
      is_login: false
    }
  }
  ,
  methods: {
  },
  created() {
    is_authenticated(this).then(res => {
      if (res == true) {
        this.is_login = true
      }
    })
  },
  computed: {
    user_id() {
      return this.$store.state.user.pk
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Tahoma, Arial, "Hiragino Sans GB", simsun, sans-serif;
  font-size: 20px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

nav {
  background: #c99774;
  display: block;
  justify-content: space-between;
  padding: 0 3em 1em 3em;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 10;
}
nav ul {
  list-style-type: none;
  float: right;
}
nav ul li {
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 0.25rem solid transparent;
}
nav a {
  text-decoration: none;
  display: inline-block;
  color: aliceblue;
  padding: 10px;
}
nav  div ul li a:hover {
  background: cadetblue;
}
nav div ul li a.active:hover,
a.active:visited {
  font-size: 27px;
  transition: 0.75s ease;
  border-bottom: 0.25rem solid blue;
}
.active {
  transition: 0.75s ease;
  border-bottom: 0.25rem solid blue;
}
</style>
