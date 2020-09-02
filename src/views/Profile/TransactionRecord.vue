<template>
  <div v-if="_is_owner" class="TransactionRecord">
    <h1>交易记录</h1>
    <h3>当前余额：{{ user.balance }}</h3>
    <ul>
      <div v-for="transaction in transactions" :key="transaction.pk">
        <li>
          <div v-if="transaction.transaction_type == 'B'">
            <p>{{ transaction.user }}采纳了你的答案，获得赏金~</p>
            <small>时间：{{ transaction.time }}</small>
            <p>赏金:{{ transaction.amount }}</p>
            <p>问题:{{ transaction.description }}</p>
          </div>
          <div v-else-if="transaction.transaction_type == 'PBQ'">
            <p>你发布一条金额为{{ transaction.amount }}的悬赏问题</p>
            <small>时间：{{transaction.time}}</small>
            <p>赏金:{{ transaction.amount }}</p>
          </div>
          <div v-else-if="transaction.transaction_type == 'DL'">
            <p>每日登陆</p>
            <small>时间：{{transaction.time}}</small>
            <p>奖励:{{ transaction.amount }}</p>
          </div>
          <div v-else-if="transaction.transaction_type == 'LT'">
            <p>你点亮了一个技能树</p>
            <small>时间：{{transaction.time}}</small>
            <p>奖励:{{ transaction.amount }}</p>
          </div>
          <div v-else-if="transaction.transaction_type == 'L10%'">
            <p>你博客点赞用户的数量超过用户总数的10%</p>
            <small>时间：{{transaction.time}}</small>
            <p>奖励:{{ transaction.amount }}</p>
          </div><div v-else-if="transaction.transaction_type == 'L25%'">
            <p>你博客点赞用户的数量超过用户总数的25%</p>
            <small>时间：{{transaction.time}}</small>
            <p>奖励:{{ transaction.amount }}</p>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Transcation from '@/assets/utils/models/Transaction'

export default {
  name: "TransactionRecord",

  props: ['_user', '_is_owner'],
  data(){
    return {
      user: this._user,
      transactions:'',
    }
  },
  created(){
    Transcation.get_wrapped_transactions(this.user.pk)
    .then(wrapped_transactions => {
      this.transactions = wrapped_transactions})
  }
}
</script>

<style scoped>
.TransactionRecord {
  background: #fafbff;
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
  background: #f6f7ff;
  border-radius: 20px;
  padding: 5px 0 5px 20px;
  transition: all 0.3s ease;
  color: #7075af;
  font-size: 26px;
}
</style>
