<template>
  <div>
    <div id class="box">
      <form>
        <div id class="inputbox">
          <label>旧密码:</label>
          <input type="email" required />
        </div>
        <div id class="inputbox">
          <label>新密码:</label>
          <input type="password" required />
        </div>
        <div id class="inputbox">
          <label>确认密码:</label>
          <input type="password" required />
        </div>
        <button type="submit" value="submit">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword'
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
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: #d2e9f3;
  bottom: 15%;
}
.box div{
  display: flex;
  justify-content: center;
}
.box div a {
  margin: 0 0 30px 0;
  padding-right: 10px;
  padding-left: 10px;
  color: black;
  text-align: center;
  font-size: 30px;
  border: border;
  border-right: 1px solid black;
}
.box div a:nth-child(3){
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
</style>
