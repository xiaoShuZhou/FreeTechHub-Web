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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.Profile {
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-areas: "left content content";
  justify-items: center;
  align-items: center;
  grid-gap: 10px;
  height: 100vh;
}
.sidebar{
  grid-area: left;
  widows: 100vh;
  justify-items: center;
  justify-content: center;

}
.content{
  grid-area: content;
  position: relative;
}
</style>
