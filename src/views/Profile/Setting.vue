<template>
<div class="setting">
  <button @click='gochangepassword'>CHANGEPASSWORD</button> |
  <router-link to="#">CHANGEEMAIL</router-link> |
  <router-link to="#">FORGETPASSWORD</router-link> |
  <router-view></router-view>
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
// import Profile from '@/views/Profile/Profile.vue'
export default {
  name: 'Setting',
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    gochangepassword() {
      User.getSelf().then(user =>{
        this.$router.push({name:"ChangePassword", params:{id: user.pk}})
        })
    }
  },

}
</script>
