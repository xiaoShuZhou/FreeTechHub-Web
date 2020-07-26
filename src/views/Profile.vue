<template>
  <div class="Profile">
    <ProfileLeftNavbar/>
  </div>
</template>

<script>
import ProfileLeftNavbar from '../components/Profile/ProfileLeftNavbar'
export default {
  name: 'Profile',
  components:{
    ProfileLeftNavbar,
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
.Profile {
  display: flex;
  position: relative;
}


</style>