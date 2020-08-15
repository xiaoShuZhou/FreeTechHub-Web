<template>
  <div class="ForgetPassword">
    <Navbar/>
    <div class="box">
      <form>
        <div class="inputbox">
          <input type="email" required="" />
          <label>Email:</label>
        </div>
        <div class="btn"><button>发送邮件</button></div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ForgetPassword",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.ForgetPassword{
	margin: 0;
	padding: 0;
  height: 100vh;
	font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 500px;
  height: 400px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(19, 18, 18, 0.5);
  background: rgba(199, 148, 148, 0.8);
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .inputbox {
  position: relative;
  width: 100%;
}

.box .inputbox input {
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.box .inputbox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  color: #ffffff;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label {
  top: -20px;
  left: 0;
  color: #3279db;
  font-size: 16px;
}
button {
  background: transparent;
  border: none;
  color: #ffffff;
  background-color: #03a9f4;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}
.buttongroup {
  text-align: center;
}
a {
  text-align: center;
  text-decoration: none;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .box{
    width: 100vw;
    height: auto;
    margin-left: 0;
  }
}
</style>
