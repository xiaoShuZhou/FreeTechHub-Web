<template>
  <div id="ProfileLeftNavbar">
    <h2>FreeTechHub</h2>
    <hr>
    <nav>
      <ul>
        <li>
          <v-icon  icon-class="profile"></v-icon>
          <a href="#">Profile</a>
          </li>
        <li><a href="#">Blogs</a></li>
        <li><a href="#">Questions</a></li>
        <li><a href="#">Following</a></li>
        <li><a href="#">Friends</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ProfileLeftNavbar',

}
</script>

<style scoped>
#ProfileLeftNavbar{
  margin: 0 600;
}
ul{
  list-style: none;
}
</style>
