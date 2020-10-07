<template>
  <div class="TransactionRecord" v-if="_is_owner">
    <h1><i class="el-icon-s-order"></i>TRANSACTION RECORD</h1>
    <h3><el-tag effect="dark" class="medi" type="warning"><i class="el-icon-coin"></i>My Coins：{{ user.balance }}</el-tag></h3>

    <el-timeline v-for="transaction in transactions" :key="transaction.pk">
      <el-timeline-item placement="top" v-if="transaction.transaction_type == 'B'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>USER [{{ transaction.user }}] adopt your answer so you get PY-coins~</p>
          <p><el-tag effect="dark" class="medi"  type="success">Amount:{{ transaction.amount }}</el-tag></p>
          <p><el-tag effect="dark" class="medi"  type="success">Question:{{ transaction.description }}</el-tag></p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top" v-else-if="transaction.transaction_type == 'PBQ'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>You post a question with {{transaction.amount}} PY-coins</p>
          <p><el-tag effect="dark" class="medi" type="success">Amount:{{ transaction.amount }}</el-tag>
          </p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item placement="top" v-else-if="transaction.transaction_type == 'DL'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>Daily login</p>
          <small>Time：{{transaction.time}}</small>
          <p>Reward:{{ transaction.amount }}</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item placement="top" v-else-if="transaction.transaction_type == 'LT'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>你点亮了一个技能树</p>
          <small>时间：{{transaction.time}}</small>
          <p>奖励:{{ transaction.amount }}</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item placement="top" v-else-if="transaction.transaction_type == 'L10%'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>你博客点赞用户的数量超过用户总数的10%</p>
          <small>时间：{{transaction.time}}</small>
          <p>奖励:{{ transaction.amount }}</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item placement="top" v-else-if="transaction.transaction_type == 'L25%'" :timestamp=transaction.time class="el-timeline-item">
        <el-card class="card">
          <p>你博客点赞用户的数量超过用户总数的25%</p>
          <small>时间：{{transaction.time}}</small>
          <p>奖励:{{ transaction.amount }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
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
.medi{
  font-size: 25px;
}
p{
  font-family:STFQLBYTJW;
}
h1{
  font-size: 50px;
  text-align: center;
  font-family:STFQLBYTJW;
  color:rgb(226, 185, 0);
}
h3{
  text-align: center;
  border-bottom: 1px solid black;
  padding: 10px 0;
  margin: 0 8vw;
  font-family:STFQLBYTJW;
  color: black;
}
ul{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-family:STFQLBYTJW;
}
.TransactionRecord::-webkit-scrollbar {display:none}
.el-timeline-item{
  font-size: 20px;
  width: 80%;
  height: 100%;
  min-height: 100px;
  margin: 20px 0;
  transition: all 0.3s ease;
}
.el-timeline-item .card{
  /* color: #7075af; */
  font-size: 26px;
  border-radius: 20px;
  }
</style>
