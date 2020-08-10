<template>
  <div class="ProfileLeftNavbar">
    <h2><router-link :to="{name:'Home'}">FreeTechHub</router-link></h2>
      <ul class="list">
        <li>
          <img src="@/assets/img/个人信息.svg" alt="">
          <router-link :to="{name:'ProfileInformation', params:{id: user.pk}}">Profile</router-link>
        </li>
        <li>
          <img src="@/assets/img/博客园.svg" alt="">
          <router-link :to="{name:'ProfileBlog'}">Blogs</router-link>
        </li>
        <li>
          <img src="@/assets/img/问题.svg" alt="">
          <router-link :to="{name:'ProfileQuestions'}">Questions</router-link>
        </li>
        <li>
          <img src="@/assets/img/关注.svg" alt="">
          <router-link :to="{name:'ProfileFollow'}">Follow</router-link>
        </li>
        <li>
          <img src="@/assets/img/好友.svg" alt="">
          <router-link :to="{name:'ProfileMessageCenter', params:{id: user.pk}}">MessageCenter</router-link>
        </li>
        <li>
          <img src="@/assets/img/树叶.svg" alt="">
          <router-link :to="{name:'ProfileSkillTrees'}">SkillTress</router-link>
        </li>
        <li>
          <img src="@/assets/img/设置.svg" alt="">
          <router-link :to="{name:'ProfileSettings', params:{id: user.pk}}">Settings</router-link>
        </li>
        <li>
          <img src="@/assets/img/登出.svg" alt="">
          <a href="#">Logout</a>
        </li>
      </ul>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: "ProfileLeftNavbar",
  data() {
    return {
      user: '',

    }
  },
  mounted() {
    User.getSelf().then(user =>{
    this.user= user
    })
  },
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
  text-decoration: none;
}
.list{
	display: flex;
	flex-direction: column;
  justify-content: flex-start;
  align-items: center;
	list-style: none;
	padding: 20px 10% 0 10%;
}
img{
	width: 20px;
	height: 20px;
}
h2{
	color: #b83dba;
  font-family: "arial narrow";
	margin: 10px 0 0 20%;
  font-size: 30px;
  word-break: break-all;
}
h2 a{
  background: none !important;
}
li{
  padding-top: 20px;
  font-size: 22px;
  word-break: break-all;
}
li:nth-child(1){
	padding-top: 10px;
	border-top: 1px solid #e4dfdf;
}
li:nth-last-child(1){
	margin-top: 60%;
}
.router-link-exact-active{
	background: #fe6b40;
}
.router-link-active{
	background: #fe6b40;

}
</style>
