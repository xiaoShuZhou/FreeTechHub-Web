<template>
  <div class="ProfileLeftNavbar">
    <h2>FreeTechHub</h2>
    <nav>
      <ul>
        <li>
          <v-icon icon-class="个人信息" class="profileicon"></v-icon>
          <a href="#">Profile</a>
        </li>
        <li>
          <v-icon icon-class="博客园"></v-icon>
          <a href="#">Blogs</a>
        </li>
        <li>
          <v-icon icon-class="问题"></v-icon>
          <a href="#">Questions</a>
        </li>
        <li>
          <v-icon icon-class="关注"></v-icon>
          <a href="#">Following</a>
        </li>
        <li>
          <v-icon icon-class="好友"></v-icon>
          <a href="#">Friends</a>
        </li>
        <li>
          <v-icon icon-class="设置"></v-icon>
          <a href="#">Settings</a>
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

div h2 {
  color: #b83dba;
  text-transform: uppercase;
  position: static;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 20px;
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
  /* width: 280px; */
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
