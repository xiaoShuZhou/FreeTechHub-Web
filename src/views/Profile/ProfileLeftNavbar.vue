<template>
  <div class="ProfileLeftNavbar">
    <h2>
      <router-link :to="{name:'Home'}">
        <img src="@/assets/img/home.svg" class="home"/>
        <span>FreeTechHub</span>
      </router-link>
    </h2>
    <ul class="list">
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileInformation', params:{id: this.user.pk}}">
          <img src="@/assets/img/个人信息.svg"/>
          <span>Profile</span>
        </router-link>
      </li>
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileBlog', params:{id: this.user.pk}}">
          <img src="@/assets/img/博客园.svg"/>
          <span>Blogs</span>
        </router-link>
      </li>
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileQuestions', params:{id: this.user.pk}}">
          <img src="@/assets/img/问题.svg"/>
          <span>Questions</span>
        </router-link>
      </li>
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileFollow', params:{id: this.user.pk}}">
          <img src="@/assets/img/关注.svg"/>
          <span>Follow</span>
        </router-link>
      </li>
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileSkillTrees', params:{id: this.user.pk}}">
          <img src="@/assets/img/树叶.svg"/>
          <span>SkillTress</span>
        </router-link>
      </li>
      <li v-if="is_owner">
        <router-link v-if="user != ''" :to="{name:'Friends', params:{id: this.user.pk}}">
          <img src="@/assets/img/好友.svg"/>
          <span>Message</span>
        </router-link>
      </li>
      <li v-if="is_owner">
        <router-link v-if="user != ''" :to="{name:'TransactionRecord', params:{id: this.user.pk}}">
          <img src="@/assets/img/交易提醒.svg"/>
          <span>Transaction</span>
        </router-link>
      </li>
      <li v-if="is_owner">
        <router-link v-if="user != ''" :to="{name:'ChangePassword', params:{id: this.user.pk}}">
          <img src="@/assets/img/设置.svg"/>
          <span>Settings</span>
        </router-link>
      </li>
      <li v-if="_is_owner">
        <a @click="logout">
          <img src="@/assets/img/登出.svg"/>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {logout} from '@/assets/utils/auth'
export default {
  name: "ProfileLeftNavbar",
  props: ['_is_owner', '_user'],
  data() {
    return {
      user: this._user,
      is_owner: this._is_owner
    }
  },
  methods:{
    logout: function() {
      logout()
      this.$store.commit("removeSocketHandle")
      this.$router.push({name: "ShowBlogs"})
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  background: #fbfcff;
}
.ProfileLeftNavbar{
  width: 100%;
  height: 100%;
  padding: 5vh 0;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
  padding: 20px 10% 0 10%;
}
img {
  width: 20px;
  height: 20px;
}
h2 a span {
  color: #b83dba;
  font-family: "arial narrow";
  margin: 10px 0 0 15%;
  font-size: 30px;
  word-break: break-all;
}
h2 a {
  background: none !important;
}
li {
  padding-top: 20px;
  font-size: 22px;
  word-break: break-all;
  transition: 0.3s;
  cursor: pointer;
}
li:nth-child(1) {
  padding-top: 10px;
  border-top: 1px solid #e4dfdf;
}
li:nth-last-child(1) {
  margin-top: 60%;
}
a{
  color: #000;
}
.router-link-exact-active {
  color: #b83dba;
  background: #fe6b40;
  transition: 0.5s;
}
.router-link-active {
  color: #b83dba;
  background: #fe6b40;
  transition: 0.5s;
}
@keyframes btn {
  100%{
    box-shadow: 0 0 50 20 rgb(112, 111, 211,0);
  }
}
.menu {
  display: none;
}
.home {
  display: none;
}
@media screen and (max-width: 1280px) {
  .ProfileLeftNavbar {
    position: absolute;
    width: 40px;
    height: 100vh;
    overflow: scroll;
    transition: all 0.5s ease-in-out;
    opacity: 0.9;
    z-index: 2;
  }
  .ProfileLeftNavbar::-webkit-scrollbar {
    display: none;
  }
  .menu {
    display: block;
    width: 30px;
    height: 20px;
    cursor: pointer;
    margin: 0 10px;
  }
  .home {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 10px;
  }
  .expanded {
    width: 200px;
    transition: all 0.5s ease-in-out;
  }
  span {
    display: none;
  }
  img{
    width: 100%;
    color: white;
  }
  ul li:hover{
	text-decoration: none;
	transition: all 0.5s ease-in-out;
	color: #031a61;
  }
}
</style>
