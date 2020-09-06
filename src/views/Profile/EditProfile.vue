<template>
<div class="EditProfile">
  <form class="account-form">
    <div class="inputbox">
      <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update" />
    </div>
    <div class="inputbox">
      <input type="text" v-model="username" required="" />
      <label>Username: </label>
    </div>
    <div class="inputbox">
      <input type="text" v-model="major" required="" />
      <label>major: </label>
    </div>
    <div class="inputbox">
      <input type="text" v-model="grade" required="" />
      <label>grade: </label>
    </div>
    <div class="inputbox">
      <input type="text" v-model="bio" required="" />
      <label>bio: </label>
    </div>
    <button class="submit" @click="save">submit</button>
  </form>
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: 'EditProfile',
  props:['_is_owner', '_user'],
  components: {},
  data() {
    return {
      id: this._user.pk,
      username: '',
      email :'',
      bio: '',
      grade: '',
      major: '',
    }
  },
  methods: {
    update(e) {
      User.upload(e).then(() => {
        this.$router.push({
          name: "ProfileInformation",
          params: {
            id: this.$route.params.id
          }
        })
      })
    },
    _getuser() {
      return new User({
        id: this.id,
        username: this.username,
        grade: this.grade,
        major: this.major,
        bio: this.bio,
        email:this.email,
      })
    },

    save() {
      let user = this._getuser()
      user.update().then(() => {
        this.$router.push({
          name: "ProfileInformation",
          params: {
            id: this.$route.params.id
          }
        })
      })
    },
    load(id) {
      User.get(id)
      .then(user => {
        this.id = user.pk
        this.username = user.username
        this.grade = user.grade
        this.bio = user.bio
        this.major = user.major
        this.email = user.email
      })
    }
  },
  created() {
    if(this.id != undefined) {
      this.load(this.id)
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.EditProfile {
  background: #f9f6ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.EditProfile .inputbox {
  position: relative;
}

.EditProfile .inputbox input {
  width: 50vw;
  padding: 10px 0;
  font-size: 20px;
  color: #000;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgb(218, 45, 45);
  outline: none;
  background: transparent;
}

.EditProfile .inputbox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  color: #000;
  pointer-events: none;
  transition: 0.5s;
}

.EditProfile .inputbox input:focus~label,
.EditProfile .inputbox input:valid~label {
  top: -20px;
  left: 0;
  color: #db32db;
  font-size: 16px;
}

button {
  background: transparent;
  border: none;
  color: #FFFFFF;
  background-color: #03A9F4;
  padding: 10px 20px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
