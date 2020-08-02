<template>
  <div class="ProfileFollow">
    <div class="Follower">
      <h2>Follower</h2>
      <div class="FollowerList">
        <ul>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="Following">
      <h2>Following</h2>
      <div class="FollowingList">
        <ul>
          <li>
            <a href="#" class="avatar">
             <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
          <li>
            <a href="#" class="avatar">
              <img src="@/assets/img/头像 女孩.svg" alt="">
            </a>
            <div class="user-content">
              <a href="#" class="title">用户名</a>
              <p class="signature">个性签名</p>
            </div>
            <a class="btn" v-on:click="follow" href="#">已关注</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollow",
  methods: {
    follow(){
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  background: #ffeef3;
}
.ProfileFollow {
  height: 100vh;
  display: grid;
  grid-template-areas: "Follower Following";
  text-align: center;
  justify-items: center;
}
img{
  width: 60px;
  height: 60px;
}
div div h2 {
  position: fixed;
  padding-top: 100px;
  padding-bottom: 50px;
}
.Follower {
  grid-area: Follower;
  overflow: scroll;
}
.Follower::-webkit-scrollbar {display:none}
.FollowerList {
  width: 100%;
  height: 100%;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  text-overflow: ellipsis;
  height: 100%;
  list-style: none;
  font: 1em sans-serif;
  line-height: 2px;
  padding-top: 50px;
}
div div ul li div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  z-index: 0;
}
.user-content {
  width: 300px;
}
.user-content a {
  display: inline-flex;
  height: 30px;
  padding-left: 20px;
}
.user-content p {
  display: flexbox;
  height: 10px;
  padding-right: 200px;
}
li {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding-top: 200px;
  border: 0;
  word-break: break-all;
  width: 400px;
  border-bottom: 1px solid black;
  text-align: -webkit-match-parent;
}
.Following {
  grid-area: Following;
  overflow: scroll;
}
.Following::-webkit-scrollbar {display:none}
.title {
  font-weight: 500;
  word-break: break-word;
}

.btn {
  position: relative;
  border: 0;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  right: 100px;
  padding-top: 30px;
  vertical-align: middle;
  display: inline-block;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 22px;
  letter-spacing: 2px;
  border-radius: 40px;
  overflow: hidden;
  background-image: repeating-linear-gradient(90deg, #979eff, #55e7fc);
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
