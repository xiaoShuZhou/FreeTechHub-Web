<template>
  <div class="RequestFriend">
    <div>
      <ul>
        <li v-for="requestlist in requestlists" :key='requestlist.url'>
          <a href="#" class="avatar">
            <img src="@/assets/img/头像 女孩.svg" alt />
            <div>
              <p v-for="fromuser in requestlist.fromuser" :key='fromuser.url'>username:{{fromuser.username}}</p>
              <p>MESSAGE:{{requestlist.request_message}}</p>
              <p>TIME:{{requestlist.timestamp}}</P>
            </div>
            <button class="btn"  @click="accept(requestlist)">accept</button>
            <button class="btn"  @click='cancel(requestlist)'>cancel</button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FriendRequest from '@/assets/utils/models/FriendRequest'
import Friendship from '@/assets/utils/models/Friendship'
import { is_authenticated } from '@/assets/utils/auth'
export default {
  data() {
    return {
      requestlists: '',
      is_cancel: '',
    }
  },
  methods: {
    _getstate(requestlist) {
      return new FriendRequest({
        id: requestlist.id,
        is_cancel: this.is_cancel,
        to_user: requestlist.to_user,
        from_user: requestlist.from_user,
      })
    },
    handle(requestlist) {
      FriendRequest.get(requestlist.id)
        .then(FriendRequest => {
          this.is_cancel = FriendRequest.is_cancel
          this.is_cancel = !this.is_cancel
          let state = this._getstate(requestlist)
          state.update()
            .then(() => {
              this.getAlllrequestlist()
            })
        })
    },
    _getfriendship(friend_1, friend_2) {
      return new Friendship({
        friend_1: friend_1,
        friend_2: friend_2,
      })
    },
    getAlllrequestlist() {
      FriendRequest.getRequestlist()
        .then(requestlist => {
          this.requestlists = requestlist.request
        })
    },
    cancel(requestlist) {
      this.handle(requestlist)
    },
    accept(requestlist) {
      this.handle(requestlist)
      let friendship = this._getfriendship(requestlist.to_user, requestlist.from_user)
      friendship.save()
    }
  },
  created() {
    if (!is_authenticated()) {
      this.$router.push({
        name: 'Login'
      })
    } else {
      this.getAlllrequestlist()
    }

  },
};
</script>

<style scoped>
.RequestFriend {
  width: 100%;
  height: 90vh;
}
ul{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
li a {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-decoration: none;
  align-items: center;
}
li {
  list-style: none;
  margin: 20px 0 20px 0;
  width: 80%;
  height: 100%;
  font-size: 24px;
  background: #eeba10;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
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
  background-image: repeating-linear-gradient(90deg, #755bea,#ff72c0);
}
img{
  width: 10%;
}
</style>
