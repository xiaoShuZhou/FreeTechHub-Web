<template>
<div class="ShowFollowing">
  <h1>following total:{{totalfollowing}}</h1>
  <div v-for="following in followings" :key='following.following_id'>
    <p>username: {{following.following_name}}</p>
    <p>bio: {{following.user_bio}}</p>
    <button @click="deleteFollowing(following)">unfollow</button>
  </div>
  <h1>follower total:{{totalfollower}}</h1>
  <div v-for="follower in followers" :key='follower.following_id'>
    <p>username: {{follower.follower_name}}</p>
    <p>bio: {{follower.user_bio}}</p>
  </div>
</div>
</template>

<style>
.v-move {
  transition: all 1s ease;
}

.v-leave-active {
  position: absolute;
}
</style>


<script>
import axios from 'axios'
// import User from '@/assets/utils/models/User'
import Followership from '@/assets/utils/models/Followership'

export default {
  Name: "ShowFollowing",
  components: {},
  data() {
    return {
      user: '',
      followings: '',
      followers:'',
      totalfollower:'',
      totalfollowing:'',
    }
  },
  methods: {
    getFollowinglist() {
      axios.get('http://127.0.0.1:8000/user/getfollowing/')
        .then(res => {
          this.followings = res.data.data,
          this.totalfollowing = this.followings.length
        })
    },
    getFollowerlist() {
      axios.get('http://127.0.0.1:8000/user/getfollower/')
        .then(res => {
          this.followers = res.data.data,
          this.totalfollower = this.followers.length
        })
    },
    deleteFollowing(following) {
      Followership.get(following.following_id).then(followership => {
        followership.delete(),
          this.getFollowinglist(),
          this.getFollowerlist()
      })

    },
  },
  created() {
    this.getFollowinglist(),
      this.getFollowerlist()
  },
  mounted() {
    this.getFollowinglist(),
    this.getFollowerlist()
}
}
</script>
