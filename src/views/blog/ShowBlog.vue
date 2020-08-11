<template>
  <div class="ShowBlog">
    <Navbar id="navbar"/>
    <div class="img">
      <img src="@/assets/img/landing.jpg" alt="">
    </div>
    <div class="blog">
      <div class="title">
        <h1>{{ blog.title }}</h1>
        <div class="user">
          <a href=""><img class="icon" src="@/assets/img/头像 女孩.svg" alt=""></a>
          <div class="content">
            <a href="">用户名</a>
            <p>个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名</p>
          </div>
        </div>
      </div>
      <div class="content" v-html="blog.m_content" v-highlight></div>
      <div class="sidebar">
        <div class="taggroup">
          <a href="" class="tag"><img class="icon" src="@/assets/img/标签.svg" alt="">{{blog.tags}}</a>
          <a href="" class="tag"><img class="icon" src="@/assets/img/标签.svg" alt="">django</a>
          <a href="" class="tag"><img class="icon" src="@/assets/img/标签.svg" alt="">vue</a>
        </div>
      </div>
      <div class="likegroup">
        <img src="@/assets/img/like.svg" @click="like" v-if="history=='liked'" alt="like-icon" />
        <img src="@/assets/img/like-o.svg" @click="like" v-else alt="like-icon" />
        <img
          src="@/assets/img/dislike.svg"
          @click="dislike"
          v-if="history=='disliked'"
          alt="dislike-icon"
        />
        <img src="@/assets/img/dislike-o.svg" @click="dislike" v-else alt="dislike-icon" />
      </div>
      <div class="buttons">
        <button @click="editBlog">Edit</button>
        <button @click="deleteBlog">Delete</button>
        <button v-if="this.followeruser.pk !== this.followinguser.pk" @click="followingship">{{content}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from "@/assets/utils/models/Blog";
import Navbar from "@/components/Navbar.vue";
import { login_required } from "@/assets/utils/auth";
import User from "@/assets/utils/models/User";
import Followership from "@/assets/utils/models/Followership";
export default {
  name: "ShowBlog",
  components: {
    Navbar,
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
  text-decoration: none;
}

.ShowBlog {
  width: 100vw;
}
.blog {
  background-color: #fff;
  z-index: 1;
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-areas: 'title  title'
                       'content sidebar'
                       'buttons buttons'; 
  grid-template-columns: 85% 15%;
  grid-template-rows: 4% 96%;
  justify-items: center;
  align-self: start;
  margin-left: 10%;
  line-height: 30px;
  margin-top: 45%;
  padding: 5% 0 0 5%;
  font-family: Merriweather,Georgia,"Times New Roman",serif;
  font-weight: 300;
  font-size: 18px;
  color: #262d3d;
  box-shadow: rgba(0, 0, 0, 0.2);
}
.title {
  grid-area: title;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.content{
  grid-area: content;
}
.sidebar{
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.buttons {
  grid-area: buttons;
  display: flex;
  justify-content: center;
  display: block;
}
.user{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 2% 1% 2% 1%;
}
.user a{
  width: 20%;
}
.user div{
  width: 60%;
}
.user div p{
  font-size: 16px;
  word-break: break-all;
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
.img img{
  top: 64px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.tag{
  display: block;
  background-color: #e16531;
  border-radius: 10px;
  width: 100px;
  margin: 20px 0 20px 0;
}
.icon{
  width: 40%;
}
.comment{
  display: block;
  margin: 20% 0 0 2%;
}
.likegroup{
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 25%;
  left: 5%;
}
.likegroup img{
  width: 50%;
  background-color: rgb(209, 204, 204);
  margin-top: 20px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.top{
  position: fixed;
  right: 0;
  bottom: 10%;
}
.top img{
  width: 50%;
}
</style>
