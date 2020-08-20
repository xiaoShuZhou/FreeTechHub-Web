<template>
  <div class="ProfileInformation">
    <AddFriend 
      v-if="status && !_is_owner" 
      :status="this.status" 
      @closealert="closealert"
      :_user=_user
      :_visitor=_visitor />
    <div class="box1">
      <div id="image">
        <img src="@/assets/img/landing.jpg" />
      </div>
      <div>
        <button v-if="profile_owner && _is_owner" @click="editProfile">Edit</button>
        <p>major:{{profile_owner.major}}</p>
        <p>Balance: {{profile_owner.blance}}</p>
        <p>grade:{{profile_owner.grade}}</p>
        <p>bio:{{profile_owner.bio}}</p>
        <FollowButton 
         :_content_owner=_user
         :_visitor=_visitor />
        <button 
          @click="showalert" 
          id="addfriend-btn"
          v-if="!_is_owner">Add Friend</button>
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
import FollowButton from '@/components/FollowButton'
import AddFriend from '@/components/AddFriend.vue'

export default {
  props: ['_user', '_visitor', '_is_owner'],
  data() {
    return {
      profile_owner: this._user,
      visitor: this._visitor,
      status: false,
    }
  },
  components: {
    FollowButton,
    AddFriend
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'EditProfile',
        params: {
          id: this.profile_owner.pk
        }
      })
    },
    showalert(){
      this.status = ! this.status
    },
    closealert(val){
      this.status = val
    },
  },
  computed: {
    profile_owner_id() {
      return this.$route.params.id
    }
  },
  watch: {
    _user(val) {
      this.profile_owner = val
    },
    _visitor(val) {
      this.visitor = val
    }
  }
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
  align-items: center;
  flex-grow: unset;
}
.box1 div p {
  display: inline;
  padding-left: 30px;
}
.box1 div:nth-child(2) {
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
