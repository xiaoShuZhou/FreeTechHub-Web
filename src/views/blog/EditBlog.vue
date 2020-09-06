<template>
  <div class="EditBlog">
    <Navbar/>
    <input type="text" class="title" v-model="title" required="required" placeholder="Title"/>
    <mavon-editor class="editor" v-model="content" />
    <button class="submit" @click="save()">submit</button>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import Navbar from '@/components/Navbar.vue'
import { login_required } from '@/assets/utils/auth'

export default {
  name: 'EditBlog',
  components: {
    Navbar,
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
          blog.save().then(() => {
            this.$router.push({ name: 'ShowBlogs' })
          })
        } else {
          blog.update().then(() => {
            this.$router.push({name: "ShowBlog", params: {id: this.blog_id}})
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
      })
    }
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
  font-size: 42px;
}
.EditBlog {
  margin-top: 10vh;
  height: 90vh;
  display: grid;
  grid-template-areas: 'title  submit'
                       'editor editor';
  grid-template-rows: 10% 90%;
  grid-template-columns: 85% 15%;
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
</style>
