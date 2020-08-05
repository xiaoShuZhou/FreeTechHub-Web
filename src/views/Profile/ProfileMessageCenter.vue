<template>
  <div class="MessageCeter">
    <div class="navbar">
      <router-link :to="{name:'Friends'}">好友消息</router-link>
      <router-link :to="{name:'Reply'}">回复我的</router-link>
      <router-link :to="{name:'RequestFriend'}">好友申请</router-link>
    </div>
    <transition class="main" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

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
</style>
