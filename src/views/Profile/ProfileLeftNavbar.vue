<template>
  <div class="ProfileLeftNavbar">
    <h2><router-link :to="{name:'Home'}">FreeTechHub</router-link></h2>
    <nav>
      <ul>
        <li>
          <v-icon icon-class="个人信息" class="profileicon"></v-icon>
          <router-link :to="{name:'ProfileInformation'}">Profile</router-link>
        </li>
        <li>
          <v-icon icon-class="博客园"></v-icon>
          <router-link :to="{name:'ProfileBlog'}">Blogs</router-link>
        </li>
        <li>
          <v-icon icon-class="问题"></v-icon>
          <router-link :to="{name:'ProfileQuestions'}">Questions</router-link>
        </li>
        <li>
          <v-icon icon-class="关注"></v-icon>
          <router-link :to="{name:'ProfileFollow'}">Follow</router-link>
        </li>
        <li>
          <v-icon icon-class="好友"></v-icon>
          <router-link :to="{name:'ProfileFriends'}">Friends</router-link>
        </li>
        <li>
          <v-icon icon-class="设置"></v-icon>
          <router-link :to="{name:'ProfileSettings'}">Settings</router-link>
        </li>
      </ul>
      <div class="logout">
      <v-icon icon-class="登出" class="logouticon"></v-icon>
      <a href="#">Logout</a>
    </div>
    </nav>
    
  </div>
</template>

<script>
export default {
  name: "ProfileLeftNavbar",
};
</script>

<style scoped>
.ProfileLeftNavbar {
  position: fixed;
  width: 10%;
  height: 100%;
  padding: 30px 0;
}
ul {
  list-style: none;
}

div h2 a{
  color: #b83dba;
  text-transform: uppercase;
  position: static;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 20px;
  border: none;
}
div nav{
  text-align: center;
  width: 100%;
  height: 100vh;

}
div nav ul{
  position: absolute;
  top: 100px;
  width: 100%;
}
div nav ul li {
  display: block;
  width: 100% !important; 
  padding: 10px;
}
div nav ul li a {
  color: black;
}
div nav ul li:hover {
  background: rgb(189, 215, 240);
  box-shadow: 5px 5px 2px #888888;
  border-radius: 20px;
}
div nav ul li:hover a {
  color: rgb(89, 241, 152);
}

.logout {
  position: relative;
  bottom: -400px;
  text-align: center;
}
.logouticon{
  position: relative;
}

.profileicon{
  display: inline;
}
</style>
