<template>
  <div class="AddFriend" 
    id="AddFriend" 
    @touchmove.prevent 
    @mousewheel.prevent
    v-if="_user.pk != _visitor.pk">
    <div class="alert">
      <div class="message">
        <label>留言信息</label>
        <textarea type="text" v-model="msg"></textarea>
      </div>   
      <div class="buttonlist">
        <button @click="friend()">发送</button>
        <button @click="cancel()">取消</button>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddFriend',
  props:{
    status: Boolean,
    top: Number,
    _visitor: Object,
    _user: Object
  },
  data() {
    return{
      msg: ''
    }
  },
  methods:{
    cancel(){
      this.$emit('closealert', false);
    },
    friend() {
      this._visitor.friend(this._user.pk, this.msg)
      .then(() => {
        this.$emit('closealert', false)
      })
    }
  },
}
</script>

<style scoped>
.AddFriend{
  top: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(79, 56, 62, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert{
  background: #5cb3cc;
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.message{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.buttonlist{
  display: flex;
  justify-content: flex-start;
}
textarea{
  width: 200px;
  height: 80px;
  border-radius: 10px;
  margin-left: 20px;
}
button{
  width: 70px;
  height: 30px;
  margin: 0 20px;
  border-radius: 5px;
  border: none;
  background: #9eccab;
  color: white;
}
</style>
