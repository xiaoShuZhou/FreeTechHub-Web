<template>
  <div class="RequestFriend">
    <div class="list">
      <h2>Your requests</h2>
      <ul>
        <li v-for="request in sent_requests" :key='request.pk'>
          <el-card class="box-card">
            <img :src="url+request.receiver_instance.avatar" alt="avatar"/>
             <el-breadcrumb id="format" separator="|">
               <el-breadcrumb-item>Author：{{ request.receiver_instance.username }}</el-breadcrumb-item>
               <el-breadcrumb-item><i class="el-icon-date"></i> {{ request.datetime }}</el-breadcrumb-item>
             </el-breadcrumb>
            <el-divider></el-divider>
            <p>Note: {{ request.note }}</p>
            <p>State: {{ request.getState() }}</p>
            <el-button icon="el-icon-error" round @click="request.cancel()" >cancel</el-button>
          </el-card>
        </li>
      </ul>
    </div>
    <div class="list">
      <h2>Received requests</h2>
      <ul>
        <li v-for="request in received_requests" :key='request.pk'>
          <el-card class="box-card">
            <img :src="url+ request.sender_instance.avatar" alt="avatar"/>
            <el-breadcrumb id="format" separator="|">
              <el-breadcrumb-item>Author：{{ request.sender_instance.username }}</el-breadcrumb-item>
              <el-breadcrumb-item><i class="el-icon-date"></i>{{ request.datetime }}</el-breadcrumb-item>
            </el-breadcrumb>     
            <el-divider></el-divider>
            <p>Note: {{ request.note }}</p>
            <p>State: {{ request.getState() }}</p>
            <el-button round type="success" @click="request.accept()">Accept</el-button>
            <el-button round type="danger" @click="request.deny()">Deny</el-button>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

// import { login_required } from '@/assets/utils/auth'
export default {
  props: ['_user'],
  data() {
    return {
      user: this._user,
      url:'http://127.0.0.1:8000',
      sent_requests: '',
      received_requests: ''
    }
  },
  methods: {
  },
  created() {
    // get all the friend request of this uesr 
    this.user.getFriendRequests()
    .then(requests => this.sent_requests = requests)
    // get all the friend request that sent to this uesr 
    this.user.getReceivedFriendRequests()
    .then(requests => this.received_requests = requests)
  },
};
</script>

<style scoped>
.RequestFriend {
  width: 100%;
  height: 90vh;
  display: flex;
}
.list {
  width: 47.5%;
}
#format{
  font-family:FZSJ-RYTJW;
  font-size: 20px;
}
ul{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
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
