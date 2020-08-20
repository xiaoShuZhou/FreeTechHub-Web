<template>
  <div class="ProfileFriends">

    <div class="friendlist">
      <input type="text" value="" placeholder="Search" οnfοcus="this.placeholder=''"/>
      <div class="list">
        <ul ref="friends">
          <li class="flex" 
              @click="chatWith(friend)" 
              v-for="friend in friends" :key='friend.pk'
              :ref="'friend-'+friend.pk">
            <img src="@/assets/img/landing.jpg" class="avatar">
            <p>{{friend.username}}</p>
            <NewMessage v-if="friend.newMessageNum != 0" :num=friend.newMessageNum />
          </li>
        </ul>
      </div>
      <button class="add">Add Friend</button>
    </div>

    <div class="chat">
      <div class="message" ref='message'>
        <ul>
          <li class="one-message" v-for="message in messages" :key="message.pk">
            <div v-if="message.sender == self.pk" class="right">
              <span>{{self.username}}</span>
              <p>{{message.content}}</p>
            </div>
            <div v-else class="left">
              <span>{{chattingWith.username}}</span>
              <p>{{message.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="edit">
        <div class="icon">
          <img src="@/assets/img/代码.svg" alt="">
          <img src="@/assets/img/img.svg" alt="">
          <a class="history-message" href="#">消息记录</a>
        </div>
        <textarea v-model="message"></textarea>
        <button type="button" class="send" @click="sendMessage()">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import {addClassNames, removeClassNames} from '@/assets/utils/classNameHandler'
import Message from '@/assets/utils/models/Message'
import Chat from '@/assets/utils/models/Chat'
import NewMessage from '@/components/NewMessage'
import WebSocketHandle from '@/assets/utils/WebSocketHandle'


export default {
  props: ["_user"],
  data() {
    return {
      self: this._user,
      friends: '',
      message: '',
      messages: [],
    }
  },
  components: {
    NewMessage
  },
  methods: {
    getFriends(user) {
      user.getFriends()
      .then(friends => this.friends = friends)
    },
    chatWith(user) {
      let msg_el = this.$refs['message']
      msg_el.scrollTop = 1000

      // clean ths background-color of the old selected user
      for (let node of this.$refs.friends.childNodes) {
        removeClassNames(node, ["selected"])
      }
      // light the selected user
      addClassNames(this.$refs['friend-'+user.pk][0], ["selected"])
      this.$store.commit('chatWith', user)
      user.newMessageNum = 0
    },
    sendMessage() {
      this.socketHandle.send_json({
        sender_id : this.self.pk,
        receiver_id: this.chattingWith.pk,
        message: this.message
      })
      this.message = ''
    }
  },
  created() {
    this.getFriends(this.self)

    WebSocketHandle.createSocketIfNotExist(this, this.self.pk)
    this.socketHandle.add_callback("chat", msg => {
      if (msg.type == "message") {
        msg = new Message(msg)
        // if the sender or receiver is who the user is chatting with
        // push the message into display
        if (msg.sender == this.chattingWith.pk ||
            msg.receiver == this.chattingWith.pk) {
          this.messages.push(msg)
        } 
        // else, add a notification
        else {
          for (let friend of this.friends) {
            if (friend.pk == msg.sender) friend.newMessageNum++
          }
        }
      }
    })
  },
  computed: {
    chattingWith () {
      return this.$store.state.chattingWith
    },
    socketHandle() {
      return this.$store.state.socketHandle
    }
  },
  watch: {
    chattingWith: {
      handler: function(newVal) {
        Chat.getChat(this.self.pk, newVal.pk).then(chat => {
          this.messages = chat.messages
        })
      },
      // 深度深入对象内部变化
      deep: true
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  background-color: #f5d772;
}
.ProfileFriends{
  display: grid;
  grid-template-areas: 'list message'
                       'list edit';
  grid-template-columns: 25% 75%;
  grid-template-rows: 100%;
}
.friendlist{
  height: 100vh;
  width: 100%;
  border: 2px solid black;

}
ul{
  overflow: scroll;
  height: 85vh;
}
ul::-webkit-scrollbar {display:none}
.friendlist button{
  width: 150px;
  height: 40px;
  border: 2px solid black;
  border-radius: 20px;
  outline: none;
}
.list{
  list-style: none;
  grid-area: list;
  padding: 20px 10px 20px 10px;
}
li{
  text-align: center;
}
li:nth-last-child(1) {
  border-bottom: 2px solid #c3c3c3;
  padding-bottom: 30px;
}
li:nth-child(1) {
  border-top: 2px solid #c3c3c3;
  padding-top: 30px;
}
.message {
  grid-area: message;
  overflow: scroll;
  scrollbar-width: none;
  height: 60vh;
}
.message::-webkit-scrollbar {display:none}

.edit {
  border: 2px solid black;
  grid-area: edit;
  height: 100%;
}
.chat {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: stretch;
  border: 2px solid black;
  height: 107%;
}
input {
  border-radius: 20px;
  border: 2px solid black;
  outline: none;
  width: 150px;
  height: 40px;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
  line-height: normal;
  text-align:center;
  vertical-align:middle;
  font-size: 30px;
  margin: 10px 0 0 30%;
}
input:focus::-webkit-input-placeholder{
  color: transparent;
}
input::-webkit-input-placeholder{
  color: #000000;
  font-size: 20px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
input::-moz-placeholder{
  color: #000000;
  font-size: 30px;
  text-align: center;
}
textarea{
  width: 100%;
  height: 80%;
  font-size: 30px;
  outline: none;
  border: none;
}
img{
  width: 50%;
  height: 100%;
}
.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.flex{
  display: flex;
  flex-direction: row;
  justify-items: baseline;
  justify-content: center;
  align-items: center;
}
li a div div{
  margin-left: 30px;
}
.history-message{
  width: 80px;
  float: right;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  background: url(~@/assets/img/向下.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
}
.send{
  border: 2px solid #ff7f27;
  width: 80px;
  height: 40px;
  text-align: start;
  font-size: 20px;
  border-radius: 10px;
  background: url(~@/assets/img/发送.svg);
  background-size: 40%;
  background-position: right;
  background-repeat: no-repeat;
  float: right;
}
.add{
  background: url(~@/assets/img/添加好友.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
  font-size: 18px;
  margin: 0 0 10px 30%;
}
.icon img{
  width: 30px;
  height: 30px;
}

.selected {
  background-color: aquamarine;
}

.one-message {
  display: flex;
  flex-direction: column;
  margin: 1vh 2vw;
}

.one-message .left {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: flex-start;
}

.one-message .right {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  align-items: flex-end;
}
</style>
