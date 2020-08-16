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
        <router-link :to="{name:'ProfileBlog'}">
          <img src="@/assets/img/博客园.svg"/>
          <span>Blogs</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'ProfileQuestions'}">
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
      <li v-if="is_owner">
        <router-link v-if="user != ''" :to="{name:'Friends', params:{id: this.user.pk}}">
          <img src="@/assets/img/好友.svg"/>
          <span>MessageCenter</span>
        </router-link>
      </li>
      <li>
        <router-link v-if="user != ''" :to="{name:'ProfileSkillTrees'}">
          <img src="@/assets/img/树叶.svg"/>
          <span>SkillTress</span>
        </router-link>
      </li>
      <li v-if="is_owner">
        <router-link :to="{name:'TransactionRecord'}">
          <img src="@/assets/img/交易提醒.svg"/>
          <span>TransactionRecord</span>
        </router-link>
      </li>
      <li v-if="is_owner">
        <router-link v-if="user != ''" :to="{name:'ChangePassword', params:{id: this.user.pk}}">
          <img src="@/assets/img/设置.svg"/>
          <span>Settings</span>
        </router-link>
      </li>
      <li>
        <a href="#">
          <img src="@/assets/img/登出.svg"/>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {login_required} from '@/assets/utils/auth'
export default {
  name: "ProfileLeftNavbar",
  props: ['_is_owner'],
  data() {
    return {
      user: '',
      is_owner: this._is_owner
    }
  },
  created() {
    login_required(this, user => this.user = user)
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.ProfileLeftNavbar{
  width: 100%;
  height: 100vh;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
.router-link-exact-active {
  background: #fe6b40;
  transition: 0.5s;
}
.router-link-active {
  background: #fe6b40;
  transition: 0.5s;
}
a:-webkit-any-link {
  color: black;
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
