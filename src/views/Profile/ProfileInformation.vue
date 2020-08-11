<template>
  <div class="ProfileInformation">
    <div class="box1">
      <div id="image">
        <img src="@/assets/img/landing.jpg" />
      </div>
      <div>
        <button v-if="user && user.pk" @click="editProfile">Edit</button>
        <p>major:{{user.major}}</p>
        <p>Balance: {{user.blance}}</p>
        <p>grade:{{user.grade}}</p>
        <p>bio:{{user.bio}}</p>
        <button v-if="user && user.pk" @click='goSendrequest'>addfriend</button>
      </div>
    </div>
    <div class="box2">
      <div>
        <img src="@/assets/img/浏览量.svg" alt="">
        <p>Total views: 666</p>
        <img src="@/assets/img/粉丝趴.svg" alt="">
        <p>Follows: 0438</p>
        <br>
        <img src="@/assets/img/点赞.svg" alt="">
        <p>Total likes: 2233</p>
        <img src="@/assets/img/概率.svg" alt="">
        <p>Accept rate: 99%</p>
      </div>
      <div>
        <img src="@/assets/img/landing.jpg" />
        <img src="@/assets/img/landing.jpg" />
      </div>
    </div>
    <div class="box3">
      <img src="@/assets/img/github活动表.jpg" />
    </div>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
import FriendRequest from '@/assets/utils/models/FriendRequest'
import { is_authenticated } from '@/assets/utils/auth'
export default {
  data() {
    return {
      user: '',
      follow: '',
      from_user: '',
    }
  },
  methods: {
    _getFriendRequest() {
      return new FriendRequest({
        to_user: this.user.pk,
        from_user: this.from_user.pk
      })
    },
    addfriend() {
        let friendRequest = this._getFriendRequest()
        friendRequest.save()
    },
    goSendrequest() {
      this.$router.push({
        name: "SendRequest",
        params: {
          id: this.$route.params.id
        }
      })
    },
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
        User.getSelf().then(from_user => {
          this.from_user = from_user
        })
      })
    }
  },
}
</script>

<style scoped>
.ProfileInformation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex;
}
div {
  background: #f9f6ff;
  padding: 10px;
  margin: 10px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.box1 {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: baseline;
  flex-grow: unset;
}
.box1 div p {
  display: inline;
  padding-left: 30px;
}
.box1 div:nth-child(2) {
  position: relative;
  bottom: 100px;
}
.box2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.box2 div p {
  display: inline;
  padding-right: 30px;
}
.box2 div img {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: relative;
  top: 28px;
  right: 5px;
  bottom: 20px;
}
.box3 img {
  border: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}
</style>
