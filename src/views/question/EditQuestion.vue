<template>
  <div class="container">
    <div class="col-md-12">
      <div class="form-group">
        <input type="text" v-model="title" class="form-control" placeholder="Title">
      </div>
      <div class="form-group">
        <mavon-editor :ishljs = "true" :preview="true" v-model="content"  placeholder="Content" />
      </div>
      <div class="form-group">
        Bounty:<input type="number" v-model = "bounty">
      </div>
      <div class="form-group">
        <router-link to='/show/questions'>
          <button class="btn btn-outline btn-success" @click="saveQuestion">保存</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import marked from 'marked'

export default {
  name: 'EditQuestion',
  props: {
  },
  
  data(){
    return {
      id:'',
      title:'',
      content:'',
      bounty:'',
      owner:'',
      question:'',
    }
  },

  methods:{
    _getQuestion(){
      return new Question({
        id: this.id,
        title: this.title,
        content: marked(this.content),
        bounty: this.bounty,
        owner: this.owner,
      })
    },

    saveQuestion(){
      let question = this._getQuestion()
      if(this.$route.name == "NewQuestion"){
        question.save().then(()=>{
          this.$router.push({name:'ShowQuestions'})
        })
      }else{
        question.update().then(()=>{
          this.$router.push({name:'ShowQuestion', params: {id: this.id }})
        })
      }
    },
  },
  created(){
    if(this.$route.params.id != undefined){
      Question.get(this.$route.params.id).then(question => {
        this.title = question.title
        this.content = question.content
        this.bounty = question.bounty
        this.id = question.pk
        this.owner = question.owner
      })
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
}

/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}

/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Add a card effect for articles */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(5rem);
}
.v-enter-active,
.v-leave-active {
  transition: all 1s ease; 
}
.v-move {
  transition: all 1s ease;
}

.v-leave-active {
  position: absolute;
}
</style>
