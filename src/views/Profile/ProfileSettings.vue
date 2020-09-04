<template>

    <div class="box">
      <div>
        <router-link v-if="user != ''" :to="{name:'ChangePassword', params:{id: user.pk}}">修改密码</router-link>
        <router-link v-if="user != ''" :to="{name:'ChangeMail', params:{id: user.pk}}">修改邮箱</router-link>
      </div>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

</template>

<script>
export default {
  props:['_is_owner', '_user'],
  name: 'ChangePassword',
  data() {
    return {
      user: this._user,
    }
  },
}

</script>

<style scoped>
.box {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  background: #fafbff;
}
.box div{
  display: flex;
  justify-content: center;
}
.box div a {
  text-decoration: none;
  padding-right: 10px;
  padding-left: 10px;
  color: black;
  text-align: center;
  font-size: 30px;
  border-right: 1px solid black;
}
.box div a:nth-child(2){
  border: none;
}
.box .inputbox {
  position: relative;
  width: 50%;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box .inputbox input {
  width: 70%;
  padding: 10px 0;
  font-size: 16px;
  color: #979eff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: 2px solid #979eff;
  border-radius: 10px;
  outline: none;
  background: transparent;
}
.box .inputbox label{
  position: relative;
  top: 0;
  left: -2%;
  padding: 10px 0;
  letter-spacing: 1px;
  color: black;
  font-size: 25px;
}
.box button[type="submit"] {
  border: none;
  color: #ffffff;
  background-color: #979eff;
  font-size: 30px;
  padding: 10px 20px;
  border-radius: 30px;
  left: 50%;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
