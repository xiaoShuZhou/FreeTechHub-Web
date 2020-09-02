<template>
  <div class="MessageCeter">
    <div class="navbar">
      <div class="link" @click="resetMessageNum()" >
        <router-link
          v-if="user != ''"
          :to="{name:'Friends', params:{id: user.pk}}">
          好友消息
        </router-link>
        <NewMessage v-if="newMessageNum != 0" :num=newMessageNum />
      </div>

      <div class="link" @click="resetReplyNum()" >
        <router-link
          :to="{name:'Reply'}">
          回复我的
        </router-link>
        <NewMessage v-if="newReplyNum != 0" :num=newReplyNum />
      </div>

      <div class="link" @click="resetRequestNum()" >
        <router-link
          v-if="user != ''"
          :to="{name:'RequestFriend',  params:{id: user.pk}}">
          好友申请
        </router-link>
        <NewMessage v-if="newRequestNum != 0" :num=newRequestNum />
      </div>
    </div>
    <transition class="main" mode="out-in">
      <router-view :_user=user :_is_owner=is_owner></router-view>
    </transition>
  </div>
</template>

<script>
import WebSocketHandle from '@/assets/utils/WebSocketHandle'
import NewMessage from '@/components/NewMessage'

export default {
  props: ["_user", "_is_owner"],
  data() {
    return {
      user: this._user,
      is_owner: this._is_owner,
      newMessageNum: 0,
      newReplyNum: 0,
      newRequestNum: 0,
    }
  },
  components: {
    NewMessage
  },
  methods: {
    resetMessageNum() {
      this.newMessageNum = 0
    },
    resetReplyNum() {
      this.newReplyNum = 0
    },
    resetRequestNum() {
      this.newRequestNum = 0
    }
  },
  created() {
    WebSocketHandle.createSocketIfNotExist(this, this.user.pk)
    this.socketHandle.add_callback("newInfo", msg => {
      let map = {
        // type: route name
        'message': {
          routeName: 'Friends',
          increase: () => this.newMessageNum++
        },
        'reply': {
          routeName: 'Reply',
          increase: () => this.newReplyNum++
        },
        'request': {
          routeName: 'RequestFriend',
          increase: () => this.newRequestNum++
        }
      }
      if (map[msg.type].routeName != this.$route.name) {
        map[msg.type].increase()
      }
    })
  },
  computed: {
    socketHandle() {
      return this.$store.state.socketHandle
    }
  },
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  background: #f5d772;
}
.MessageCeter{
  display: grid;
  grid-template-areas: 'navbar'
                       'main';
  grid-template-rows: 10% 90%;
}
.navbar{
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.router-link-exact-active{
	background: #fe6b40;
}

.link {
  display: flex;
}
</style>
