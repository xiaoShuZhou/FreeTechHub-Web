<template>
<div class="EditProfile">
  <form class="account-form">
    <h3>major: </h3> <input type="text" v-model="major" required="required" />
    <h3>grade: </h3> <input type="text" v-model="grade" required="required" />
    <h3>bio: </h3> <input type="text" v-model="bio" required="required" />
    <button class="submit" @click="save">submit</button>

  </form>
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: 'EditProfile',
  components: {},
  data() {
    return {
      user: null,
      username: '',
      email: '',
      bio: '',
      grade: '',
      major:'',
    }
  },
  methods: {
    _getuser() {
      return new User({
        id: this.id,
        username: this.username,
        grade: this.grade,
        major: this.major,
        bio: this.bio,
        email: this.email,
      })
    },
    save() {
      let user = this._getuser()
      user.update().then(() => {
        this.$router.push({
          name: 'ShowProfile',
          params: {
            id: this.$route.params.id
          }
        })
      })
    }
  },
  created() {
    if (this.$route.params.id != undefined) {
      User.get(this.$route.params.id)
        .then(user => {
          this.id = user.pk
          this.username = user.username
          this.grade = user.grade
          this.bio = user.bio
          this.major = user.major
          this.email = user.email

        })
    }
  }
}
</script>
