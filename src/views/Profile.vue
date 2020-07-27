<template>
  <div class="Profile">
    <ProfileLeftNavbar class="sidebar"/>
    <ProfileFollow class="content"/>
  </div>
</template>

<script>
import ProfileLeftNavbar from '../components/Profile/ProfileLeftNavbar'
import ProfileFollow from '../components/Profile/ProfileFollow'
export default {
  name: 'Profile',
  components:{
    ProfileLeftNavbar,
    ProfileFollow
  }
  
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
html body{
  height: 100%;
}
.Profile {
  display: grid;
  grid-template-areas: "sidebar content";
  justify-items: space-between;

}
.sidebar{
  grid-area: sidebar;
}
.content{
  grid-area: content;
}
</style>