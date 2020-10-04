<template>
<div>
  <el-row type="flex" justify="center">
    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
      <div class="fel-upload">
        <el-upload :class="{hide:hideUpload}" :file-list="fileList" action="#" :auto-upload="false" list-type="picture-card" :on-remove="handleRemove" :on-change="handleEditChange" :limit="1">
          <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <div style="word-break: break-all;">
                <i style="font-size:90px;line-height: 5px;word-break: break-all;" class="el-icon-upload"></i>
                <p id="tip">Drag and drop an image</p>
              </div>
            </el-col>
          </el-row>
        </el-upload>
      </div>
    </el-col>
    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
      <div class="title">
        <div>
          <p>Title:{{title}}</p>
          <el-input v-model="title" placeholder="Add a Title"></el-input>
        </div>
        <div>
          <p>Bounty</p>
          <el-input v-model="bounty" placeholder="" type="number"></el-input>
        </div>
        <div>
          <NewTag ref="NewTag" />
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
      <div class="content">
        <h2>Content:</h2>
        <p v-html="content" v-highlight></p>
      </div>
      <div class="editor">
        <mavon-editor :ishljs="true" :preview="true" v-model="content" placeholder="Content" />
      </div>
    </el-col>
  </el-row>
    <div class="button">
      <el-button type="warning" round  @click="saveQuestion">保存</el-button>
    </div>
</div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Transaction from '@/assets/utils/models/Transaction'
import {
  login_required
} from '@/assets/utils/auth'
import NewTag from '@/components/Tags/NewTag.vue'
import Tag from '@/assets/utils/models/Tag'

// import marked from 'marked'

export default {
  name: 'EditQuestion',
  props: {},
  components: {
    NewTag
  },
  data() {
    return {
      hideUpload: false,
      fileList: [],
      file: '',
      id: '',
      title: '',
      content: '',
      bounty: '',
      user: '',
      question: '',
      background_image: '',
      tags: []
    }
  },

  methods: {
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= 1
    },
    handleEditChange(file, fileList) {
      this.file = file
      this.hideUpload = fileList.length >= 1
    },
    _getQuestion() {
      return new Question({
        id: this.id,
        title: this.title,
        content: this.content,
        bounty: this.bounty,
        owner: this.user.pk,
        background_image: this.file.raw,
      })
    },
    _getTransaction() {
      return new Transaction({
        user: this.user.pk,
        amount: this.bounty,
        transaction_type: 'PBQ',
        description: this.title,
      })
    },
    saveQuestion() {
      let question = this._getQuestion()
      console.log(question)
      if (this.$route.name == "NewQuestion") {
        if (this.user.balance >= this.bounty) {
          question.save().then(res => {
            let transaction = this._getTransaction()
            this.tags = this.$refs.NewTag.tags

            let promises = [
              transaction.save(),
              Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            ]

            Promise.all(promises).then(() => {
              this.$router.push({
                name: 'ShowQuestions'
              })
            })
          })
        } else {
          alert("your balance is not enough.")
        }
      } else {
        if (this.user.balance >= this.bounty) {
          question.update().then(res => {
            let transaction = this._getTransaction()
            this.tags = this.$refs.NewTag.tags

            let promises = [
              transaction.save(),
              Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            ]

            Promise.all(promises).then(() => {
              this.$router.push({
                name: 'ShowQuestion',
                params: {
                  id: this.id
                }
              })
            })
          })
        } else {
          alert("your balance is not enough.")
        }
      }
    },
  },
  created() {
    login_required(this, user => {
      this.user = user
      if (this.$route.params.id != undefined) {
        Question.get(this.$route.params.id)
          .then(question => {
            this.title = question.title
            this.content = question.content
            this.bounty = question.bounty
            this.id = question.pk
            this.owner = question.owner
            this.fileList.append(question.background_image)
            question.tags.forEach(tag => {
              this.$refs.NewTag.tags.push(tag.tag_name)
            })
          })
      }
    })
  }
}
</script>

<style >
.summary /deep/ .el-row {
  width: 95%;
  height: 100%;
  word-break: break-all;
}

.button /deep/ .el-button {
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#tip {
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 5px;
  word-break: break-all;
}

#tip:hover {
  color: rgb(189, 82, 148);
}

.fel-upload /deep/ .el-upload {
  width: 95%;
  height: 400px;
  word-break: break-all;
}
.el-upload-list--picture-card .el-upload-list__item  {
  width: 95%;
  height: 400px;
  word-break: break-all;
}

.title /deep/ .el-col {
  line-height: 0px;
  width: 95%;
  height: 100%;
  word-break: break-all;
}

.hide .el-upload--picture-card {
  display: none;
}

.title {
  text-align: left;
  font-size: 25px;
}

body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}

h2 {
  text-align: center;
  word-break: break-all;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

input {
  width: 180px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid black;
  outline: none;
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

.form-group {
  text-align: center;
  margin: 5vh 0;
}

.btn {
  border-radius: 20px;
  border: 2px solid #ffcec1;
  width: 60px;
  height: 30px;
  background: #ffcec1;
  outline: none;
}
</style>
