<template>
  <div class="TransactionRecord">
    <h1>交易记录</h1>
    <h3>当前余额：2233</h3>
    <ul>
      <li>
        <p>你采纳了用户1的答案，失去赏金~</p>
        <small>时间：昨天</small>
        <p>余额~</p>
      </li>
      <li>
        <p>用户1采纳了你的答案，获得赏金~</p>
        <small>时间：昨天</small>
        <p>余额~</p>
      </li>
      <li>
        <p>你采纳了用户2的答案，失去赏金~</p>
        <small>时间：昨天</small>
        <p>余额~</p>
      </li>
      <li>
        <p>用户2采纳了你的答案，获得赏金~</p>
        <small>时间：昨天</small>
        <p>余额~</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TransactionRecord",
};
</script>

<style scoped>
.TransactionRecord {
  background: #b7e1f5;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}
h1{
  text-align: center;
}
h3{
  text-align: center;
  border-bottom: 1px solid black;
  padding: 10px 0;
  margin: 0 8vw;
}
ul{  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.TransactionRecord::-webkit-scrollbar {display:none}
li{
  width: 80%;
  height: 100%;
  min-height: 100px;
  margin: 20px 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background: #3498db;
  border-radius: 20px;
  padding: 5px 0 5px 20px;
  transition: all 0.3s ease;
  color: #fff;
  font-size: 26px;
}
</style>
