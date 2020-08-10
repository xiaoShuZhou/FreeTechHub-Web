<template>
  <div class="ProfileFollow">
    <div class="Following">
      <h2>Following<small>粉丝数：{{totalfollowing}}</small></h2>
      <div class="FollowingList">
        <ul>
          <li v-for="following in followings" :key='following.following_id'>
            <a @click='gopersonalprofile(follower)' class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt />
              <div>
                <p>username: {{following.following_name}}</p>
                <p>bio: {{following.user_bio}}</p>
              </div>
              <button class="btn" v-on:click.stop="deleteFollowing(following)" href="#">已关注</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="Follower">
      <h2>Follower<small>关注数：{{totalfollower}}</small></h2>
      <div class="FollowerList">
        <ul>
          <li v-for="follower in followers" :key='follower.following_id'>
            <a @click='gopersonalprofile(follower)' class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt />
              <div>
                <p>username: {{follower.follower_name}}</p>
                <p>bio: {{follower.user_bio}}</p>
              </div>
              <button class="btn" v-on:click.stop="follow" href="#">已关注</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Followership from '@/assets/utils/models/Followership'
import User from '@/assets/utils/models/User'
export default {
  name: "ProfileFollow",
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
    follow() {},
    gopersonalprofile(follower) {
      User.get(follower.id).then(user => {
        this.$router.push({
          name: "ProfileInformation",
          params: {
            id: user.pk
          }
        })
      })

    },
    getFollowinglist() {
      Followership.getFollowinglist().then(followings => {
        this.followings = followings
        this.totalfollowing = this.followings.length
      })
    },
    getFollowerlist() {
      Followership.getFollowerlist().then(followers => {
        this.followers = followers,
        this.totalfollower = this.followers.length
      })
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
    this.getFollowinglist()
    this.getFollowerlist()
  },
  mounted() {
    this.getFollowinglist()
    this.getFollowerlist()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  background: #ffeef3;
}
.ProfileFollow {
  display: grid;
  grid-template-areas: "Follower Following";
  grid-template-columns: 50% 50%;
  justify-items: center;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
div div h2 {
  width: 300px;
  margin: 20px 0 10px 30%;
}
small{
  font-size: 15px;
  padding: 0 0 0 20px;
}
.Follower {
  grid-area: Follower;
}
ul{
  overflow: scroll;
}
ul::-webkit-scrollbar {
  display: none;
}
li a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
}
li {
  list-style: none;
  margin: 20px 0 20px 0;
}
li:nth-child(1) {
  border-top: 1px solid #e4dfdf;
  padding-top: 30px;
}
.Following {
  grid-area: Following;
}
.Following::-webkit-scrollbar {
  display: none;
}
.btn {
  border: none;
  color: white;
  width: 100px;
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 22px;
  letter-spacing: 2px;
  border-radius: 20px;
  background-image: repeating-linear-gradient(90deg, #979eff, #55e7fc);
}
.FollowingList .btn{
  background-image: repeating-linear-gradient(90deg, #755bea,#ff72c0);
}
span {
  position: absolute;
  background: white;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
}
@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
</style>
