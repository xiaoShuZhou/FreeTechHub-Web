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
import Followership from '@/assets/utils/models/Followership'

export default {
  Name: "ShowFollowing",
  components: {},
  data() {
    return {
      user: '',
      followings: '',
      followers: '',
      totalfollower: '',
      totalfollowing: '',
    }
  },
  methods: {
    getFollowinglist() {
      Followership.getFollowinglist().then(followings=>{this.followings =followings , this.totalfollowing = this.followings.length  })
    },
    getFollowerlist() {
      Followership.getFollowerlist().then(followers=>{this.followers =followers ,   this.totalfollower = this.followers.length  })
    },
    deleteFollowing(following) {
      Followership.get(following.following_id).then(followership => {
        followership.delete().then(() => {
          this.getFollowinglist()
          this.getFollowerlist()
        })

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
