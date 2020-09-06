<template>
  <div class="EditBlog">
    <Navbar/>
    <el-input type="text" class="title" v-model="title" required="required" placeholder="Title" clearable></el-input>
    <mavon-editor class="editor" v-model="content" />
    <NewTag class="newtag" ref="NewTag"/>
    <el-button class="submit" @click="save()">Submit</el-button>
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
      blog_id: this.id,
      title: '',
      content: '',
      blog: '',
      owner: '',
      tags: [],
    }
  },
  methods: {
    _getblog(user) {
      return new Blog({
        id: this.blog_id,
        title: this.title,
        content: this.content,
        owner : this.owner == '' ? user.pk : this.owner
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
          blog.update().then(res => {
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  grid-area: title;
  font-size: 72px;
  height: 100;
}
.EditBlog {
  margin-top: 10vh;
  height: 90vh;
  display: grid;
  grid-template-areas: 'title  submit'
                       'newtag newtag'
                       'editor editor';
  grid-template-rows: 10% 5% 85%;
  grid-template-columns: 85% 15%;
  grid-row-gap: 2vh;
}
.newtag{
  grid-area: newtag;
}
.editor{
  grid-area: editor;
}
.submit {
  grid-area: submit;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  min-width: 8vw;
  min-height: 7vh;
  font-size: 42px;
  color: #311f1f;
  outline: none;
}
button:hover{
  box-shadow: 0 10px 14px 0 rgba(0, 0, 0, 0.2);
}

.tags ul {
  display: flex;
}

.tags li {
  margin: 1vh 3vw;
}

</style>
