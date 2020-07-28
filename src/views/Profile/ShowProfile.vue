<template>
<div class="Profile_show">
  <h1>Profile</h1>
  <button @click="editProfile">Edit</button>
  <ul>
    <li>
      <div class="card">
        <h3>username:{{user.username}} </h3>
        <h3>email:{{user.email}}</h3>
        <h3>major:{{user.major}}</h3>
        <h3>grade:{{user.grade}} </h3>
        <h3>bio:{{user.bio}} </h3>
      </div>
    </li>
  </ul>

</div>
</template>

<script>
import User from '@/assets/utils/models/User'
import {is_authenticated} from '@/assets/utils/auth'

export default {
  name: 'ShowProfile',
  components: {

  },
  data() {
    return {
      user:'',
      follow:'',

    }
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'EditProfile',
        params: {
          id: this.user.pk
        }
      })
    },
  },
  created() {
    if (!is_authenticated()) {
      this.$router.push({
        name: 'Login'
      })
    } else {
      User.get(this.$route.params.id).then(user => {
        this.user = user
      })
    }

  },
}
</script>
