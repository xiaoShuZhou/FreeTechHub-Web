<template>
  <div class="Profile">
    <Navbar/>
    <router-link to="#">Blogs</router-link> |
    <router-link to="#">Questions</router-link> |
    <button @click='goFollowing'>Following</button> |
    <router-link to="#">Friends</router-link> |
    <router-link to="#">settings</router-link> |
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import User from '@/assets/utils/models/User'
export default {
  Name: "Profile",
  components: {
    Navbar
  },
  methods: {
    goFollowing() {
      User.getSelf().then(user =>{
        this.$router.push({name:"ShowFollowing", params:{id: user.pk}})
        })
    },
  }
}
</script>
