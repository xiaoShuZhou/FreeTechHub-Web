<template>
  <div class="Profile">
    <ProfileLeftNavbar class="sidebar"/>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import ProfileLeftNavbar from '@/views/Profile/ProfileLeftNavbar'
export default {
  name: 'Profile',
  components:{
    ProfileLeftNavbar
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.Profile {
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-areas: "left content";
  grid-template-rows: 100%;
}
.sidebar{
  grid-area: left;
}
.content{
  grid-area: content;
}
</style>
