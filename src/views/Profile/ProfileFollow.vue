<template>
  <div class="ProfileFollow">
    <div class="Followings">
      <h2>Following<small>关注数：{{totalfollowing}}</small></h2>
      <div class="FollowingList">
        <ul>
          <li v-for="following in followings" :key='following.following_id'>
              <img :src="profile_owner.avatar" alt />
              <div>
                <router-link :to="{name: 'ProfileInformation', params: {id: following.pk}}">
                  {{following.username}}
                </router-link>
                <p>bio: {{following.bio}}</p>
              </div>
              <FollowButton
                v-if="_is_owner"
                :_content_owner=following
                :_visitor=user
                :_follow=true />
          </li>
        </ul>
      </div>
    </div>
    <div class="Followers">
      <h2>Follower<small>粉丝数：{{totalfollower}}</small></h2>
      <div class="FollowerList">
        <ul>
          <li v-for="follower in followers" :key='follower.following_id'>
            <img src="@/assets/img/头像 女孩.svg" alt />
            <div>
              <router-link :to="{name: 'ProfileInformation', params: {id: follower.pk}}">
                {{follower.username}}
              </router-link>
              <p>bio: {{follower.bio}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FollowButton from '@/components/FollowButton'

export default {
  props:['_is_owner', '_user'],
  name: "ProfileFollow",
  components: {
    FollowButton
  },
  data() {
    return {
      user: this._user,
      followings: '',
      followers: '',
      totalfollower: '',
      totalfollowing: '',
    }
  },
  created() {
    this.user.getFollowershipList()
    .then(res => {
      this.followings = res.followings
      this.followers = res.followers
      this.totalfollower = this.followers.length
      this.totalfollowing = this.followings.length
    })
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  background: #fafbff;
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
.Followers {
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
.Followings {
  grid-area: Following;
}
.Followings::-webkit-scrollbar {
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
