<template>
  <div class="Profile">
    <ProfileLeftNavbar class="sidebar"/>
    <!-- <ProfileFollow class="content"/> -->
    <ProfileBlogs class="content"/>
  </div>
</template>

<script>
import ProfileLeftNavbar from '../components/Profile/ProfileLeftNavbar'
// import ProfileFollow from '../components/Profile/ProfileFollow'
import ProfileBlogs from '../components/Profile/ProfileBlogs'
export default {
  name: 'Profile',
  components:{
    ProfileLeftNavbar,
    // ProfileFollow,
    ProfileBlogs,
  }
  
}
</script>

<style scoped>
*{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.Profile {
  /* box-sizing: border-box; */
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-areas: "left content content";
  justify-items: center;
  align-items: center;
  grid-gap: 10px;

}
.sidebar{
  grid-area: left;
  widows: 100vh;
  justify-items: center;
  justify-content: center;
}
.content{
  grid-area: content;
}
</style>