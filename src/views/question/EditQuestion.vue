<template>
<div  class="EditQuestion">
  <Navbar />
  <el-row type="flex" justify="center">
    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="fel-upload">
        <el-upload class="fel-upload" :class="{hide:hideUpload}" :file-list="fileList" action="#" :auto-upload="false" list-type="picture-card" :on-remove="handleRemove" :on-change="handleEditChange" :limit="1">
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
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="titleq">
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
    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
      <div class="content">
        <h2>Content:</h2>
      </div>
      <div >
        <mavon-editor :ishljs="true" :preview="true" v-model="content" placeholder="Content" class="editor1" />
      </div>
    </el-col>
  </el-row>
    <div class="button11">
      <el-button class="button1" @click="saveQuestion">submit</el-button>
    </div>
</div>
</template>

<script>
import Question from '@/assets/utils/models/Question'
import Transaction from '@/assets/utils/models/Transaction'
import {login_required} from '@/assets/utils/auth'
import NewTag from '@/components/Tags/NewTag.vue'
import Tag from '@/assets/utils/models/Tag'
import Navbar from '@/components/Navbar'

export default {
  name: 'EditQuestion',
  props: {},
  components: {
    NewTag,
    Navbar
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
      if (this.$route.name == "NewQuestion") {
        if (this.user.balance >= this.bounty) {
          question.save().then(res => {
            this.tags = this.$refs.NewTag.tags

            let promises = [
              Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            ]

            if(this.bounty) {
              let transaction = this._getTransaction()
              promises.push(transaction.save())
            }

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
          question.update(this.file.raw).then(res => {
            this.tags = this.$refs.NewTag.tags

            let promises = [
              Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            ]

            if(this.bounty) {
              let transaction = this._getTransaction()
              promises.push(transaction.save())
            }
            
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
            if(question.background_image){ this.hideUpload = true}
            this.fileList.push({url: question.background_image})
            question.tags.forEach(tag => {
              this.$refs.NewTag.tags.push(tag.tag_name)
            })
          })
      }
    })
  }
}
</script>

<style>
.EditQuestion {
  margin-top: 11vh;
  height: 90vh;
  display: grid;
  grid-row-gap: 2vh;
}
.summary /deep/ .el-row {
  width: 95%;
  height: 100%;
  word-break: break-all;
}

.button11 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button1{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 8vw;
  min-height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin-bottom: 10%;
}

#tip {
  font-size: 120%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 19px;
  word-break: break-all;
}
.editor1{
  height:450px;
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
  height: 450px;
  word-break: break-all;
}

.titleq /deep/ .el-col {
  line-height: 0px;
  width: 95%;
  height: 100%;
  word-break: break-all;
}

.hide .el-upload--picture-card {
  display: none;
}

.titleq {
  text-align: left;
  font-size: 25px;
}

.newtag{
  grid-area: newtag;
}
</style>
