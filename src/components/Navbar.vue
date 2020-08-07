<template>
  <div class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/show/blogs">blogs</router-link> |
    <router-link to="/show/series">series</router-link> |
    <router-link to="/show/questions">questions</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link :to="{name:'ProfileInformation', params:{id: user.pk}}">Profile</router-link>
    <input type="text" name="search" v-model="search_tag_name" placeholder="Search"/>
    <button @click="search"><img src="@/assets/img/放大镜.svg" alt=""></button>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'

export default {
  name: "Navbar",
  data() {
    return {
      search_tag_name: '',
      user: '',
    }
  },
  methods: {
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
  },
  mounted() {
    User.getSelf().then(user =>{
    this.user= user
    })
  },
}
</script>

<style  scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.navbar{
  margin: 0;
  padding: 0;
  background-color: #ffdcc9;
  display: flex;
  justify-content: center;
  font-size: 24px;
  height: 40px;
}
input{
  border-radius: 10px;
  outline: none;
  font-size: 24px;
}
input::-webkit-input-placeholder{
	color: #000000;
	text-align: center;
}
input::-moz-placeholder{
	color: #000000;
	text-align: center;
}
input:focus::-webkit-input-placeholder{
  color: transparent;
}
button{
  background: transparent;
  border: none;
  outline: none;
  border-radius: 20%;
}
button:hover{
  background: aqua;
}
img{
  width: 30px;
  height: 30px;
}
#login{
  border-right: 0px !important;
  color: #000;
}
a{
  padding: 0 10px 0 10px;
	margin: 0 10px 0;
	background-color: #ffcec1;
	border-radius: 30px;
}
.router-link-exact-active{
	background: #fe6b40;
}
</style>
