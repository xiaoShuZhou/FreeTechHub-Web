<template>
  <div class="Profile">
    <ProfileLeftNavbar class="sidebar"/>
    <transition>
      <router-view class="content" mode="out-in"></router-view>
    </transition>
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
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
@media screen and (max-width: 1025px){
  .Profile {
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas: "content";
  grid-template-rows: 100%;
}
  .sidebar{
    display: none;
  }
}
</style>
