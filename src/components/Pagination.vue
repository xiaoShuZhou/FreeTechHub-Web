<template>
  <div class="pager"> 
    <a href="javascript:void(0);" v-if="showFirstPage" v-on:click="firstPage" >首页</a>
    <a href="javascript:void(0);" v-if="showPrevPage" v-on:click="prevPage" >上一页</a>
    <span>{{curPage}}/{{total}}</span>
    <a href="javascript:void(0);" v-if="showNextPage" v-on:click="nextPage" >下一页</a>
    <a href="javascript:void(0);" v-if="showLastPage" v-on:click="lastPage" >尾页</a>     
    <div class="goto">
      <input type="text" v-model="gotoPage" />
      <a href="javascript:void(0);" v-on:click="gotoNextPage" >跳转</a>
    </div>
  </div>
</template>

<script>
export default {
  props:[ 
    "_curPage",
    "total"
  ],
  name: 'Pager',
  data () {
    return {
      curPage: this._curPage,
      gotoPage: "",
      showFirstPage: true,
      showLastPage: true,
      showPrevPage: true,
      showNextPage: true,
    }
  },
  methods:{
    nextPage() {//下一页            
      this.$emit('setPage', this.curPage+ 1 ) //调用父组件方法
    },
    prevPage() {//上一页
      this.$emit('setPage', this.curPage- 1 ) //调用父组件方法
    },
    gotoNextPage() {//跳转页面
      if(this.gotoPage && /[1-9][0-9]*/.test(this.gotoPage)) {             
        var pg = parseInt(this.gotoPage)
        if(pg > 0){
          if(pg <= this.total){
            this.$emit('setPage', pg ) //调用父组件方法
          } else {
            this.gotoPage = ""
            alert("Your input is out of range")
          }
        } else {
          this.gotoPage = ""
          alert("Your input should be more than 0")
        }
      } else {
        this.gotoPage = ""
      }
    },      
    firstPage() {
      this.$emit('setPage', 1 ) //调用父组件方法
    },
    lastPage() {
      this.$emit('setPage', this.total ) //调用父组件方法
    },
    initPager() {
      this.showFirstPage = this.curPage > 1
      this.showLastPage = this.curPage < this.total
      this.showPrevPage = this.curPage > 1
      this.showNextPage = this.curPage < this.total
      this.gotoPage = ""
    }
  },
  mounted() {
    this.$nextTick(() => { this.initPager() }) //需要延迟初始化
  },
  watch: {
    _curPage(val){
      this.curPage = val
      this.initPager()
    }
  }
}
</script>

<style>
.pager>span,.pager>a,.pager>select,.pager>div{
  float: left;
  margin-left: 10px;
}

.pager{
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  height: 48px;
  line-height: 48px;
  margin-bottom: 40px;
}

.pager input,.pager select{
  height:40px; 
  line-height:40px;
  outline:none; 
  border:1px solid #888; 
  padding:10px; 
  box-sizing:border-box;
}
.pager input{
  width: 50px;
}
.pager .goto{
  margin-left: 20px;
}
.pager a{
  color: black;
  font-weight: bold;
  text-decoration: none;
}
.pager a:hover{
  color: green;
}

</style>