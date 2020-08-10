<template>
  <div class="ShowBlog">
    <Navbar/>
    <div class="blog">
      <h1 class="title">{{ blog.title }}</h1>
      <div class="content" v-html="blog.m_content" v-highlight></div>
      <div class="buttons">
      <button @click="editBlog">Edit</button>
      <button @click="deleteBlog">Delete</button>
      <button v-if="this.followeruser.pk !== this.followinguser.pk" @click="followingship">{{content}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from '@/assets/utils/models/Blog'
import Navbar from '@/components/Navbar.vue'
import { login_required } from '@/assets/utils/auth'
import User from '@/assets/utils/models/User'
import Followership from '@/assets/utils/models/Followership'

export default {
  name: "ShowBlog",
  components: {
    Navbar
  },
  data() {
    return {
      blog: '',
      followership:'',
      followinguser:'',
      followeruser:'',
      followerlists:'',
      deleteid:'',
      content: 'follow',
      liked: true,

    }
  },
  methods: {
    _getFollowership() {
      return new Followership({
        following:this.followinguser.pk,
        follower:this.followeruser.pk,
      })
    },
    init(){
      let follower_id = []
      if(!this.followerlists)
      {
        return;
      }
      this.followerlists.forEach(followerlist => {
        follower_id.push({'following_id':followerlist.following,'id':followerlist.id})
      })
      follower_id.forEach(item=>{
      if(item.following_id==this.followinguser.pk){
          this.deleteid = item.id
          this.liked = false
          this.content = "unfollow"
        }
      else{
        this.liked = true;
        this.content = "Follow"
        }
      })
   },
    deleteBlog() {
      this.blog.delete().then(() => {
          this.$router.push({name: 'ShowBlogs'})
      })
    },
    editBlog() {
      this.$router.push({name: 'EditBlog'})
    },
    followingship() {
      let followership = this._getFollowership()
      if (this.liked) {
        this.content = "unfollow"
        this.liked = !this.liked
        followership.save()
      } else {
          this.content = "follow"
          User.getSelf().then(user =>{
            this.followeruser = user
            this.followerlists = this.followeruser.follower_users
            let follower_id = []
            if(!this.followerlists)
             {
               return;
             }
             this.followerlists.forEach(followerlist => {
               follower_id.push({'following_id':followerlist.following,'id':followerlist.id})
             })
             follower_id.forEach(item=>{
             if(item.following_id==this.followinguser.pk){
                 this.deleteid = item.id
             }
             else{
               console.log('ERR')
             }
           })
           Followership.get(this.deleteid).then(followership => {followership.delete()})
         })
         this.liked = !this.liked
      }
    },
  },
  created() {
    login_required(this, (user) => {
        Blog.get(this.$route.params.id)
        .then(blog => {
          this.blog = blog
          this.followeruser = user
          this.followerlists = this.followeruser.follower_users
          this.init()
          User.get(this.blog.owner).then(user =>{
            this.followinguser = user
            this.init()
          })
        })
    })
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ShowBlog {
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog {
  padding: 3vh 2vw;
  background-color: #fafcff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  text-align: center;
  margin: 7vh 2vw;
}

.buttons {
  display: flex;
  margin: 2vh 2vw;
  justify-content: center;
}

button {
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  width: 14vw;
  height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin: 3vh 2vw;
}
</style>
