<template>
<div  class="EditBlog">
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
      <el-button class="button1" @click="save()">submit</el-button>
    </div>
</div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import Tag from '@/assets/utils/models/Tag'
import Navbar from '@/components/Navbar.vue'
import NewTag from '@/components/Tags/NewTag.vue'
import { login_required } from '@/assets/utils/auth'

export default {
  name: 'EditBlog',
  components: {
    Navbar,
    NewTag
  },
  props: {
    id: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      hideUpload: false,
      fileList: [],
      file: '',
      blog_id: this.id,
      title: '',
      content: '',
      blog: '',
      owner: '',
      tags: [],
      background_image: '',

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

    _getblog(user) {
      return new Blog({
        id: this.blog_id,
        title: this.title,
        content: this.content,
        owner : this.owner == '' ? user.pk : this.owner,
        background_image: this.file.raw,
      })
    },

    save() {
      login_required(this, user => {
        let blog = this._getblog(user)
        if (this.$route.name == "NewBlog") {
          blog.save().then((res) => {
            this.tags = this.$refs.NewTag.tags
            Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            .then(() => {
              this.$router.push({ name: 'ShowBlogs' })
            })
          })
        } else {
          blog.update(this.file.raw).then(res => {
            this.tags = this.$refs.NewTag.tags
            Tag.saveTags(this.tags, res.data.id, res.data.content_type_id)
            .then(() => {
              this.$router.push({name: "ShowBlog", params: {id: this.blog_id}})
            })
          })
        }
      })
    },

    load(id) {
      Blog.get(id)
      .then(blog => {
        this.blog_id = blog.pk
        this.title = blog.title
        this.content = blog.content
        this.owner = blog.owner
        if(blog.background_image){ this.hideUpload = true}
        this.fileList.push({url: blog.background_image})
        blog.tags.forEach(tag => {
          this.$refs.NewTag.tags.push(tag.tag_name)
        })
      })
    },
  },

  created() {
    if(this.id != undefined) {
      this.load(this.blog_id)
    }
  },
}
</script>

<style>
.EditBlog {
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

.el-upload{
  width: 95%;
  height: 400px;
  word-break: break-all;
}
.el-upload-list--picture-card .el-upload-list__item  {
  width: 95%;
  height: 400px;
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
