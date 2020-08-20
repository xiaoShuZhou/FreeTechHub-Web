<template>
  <div class="ShowBlog">
    <Navbar id="navbar" :_user='user'/>
    <AddFriend 
      v-if="status" 
      :status="this.status" 
      @closealert="closealert"
      :_user=blog.owner_instance
      :_visitor=user />
    <div class="img">
      <img src="@/assets/img/landing.jpg" alt />
    </div>
    <div class="blog" v-if="blog != ''">
      <div class="title">
        <h1>{{ blog.title }}</h1>
        <div class="user">
          <a href>
            <img class="icon" src="@/assets/img/头像 女孩.svg" alt />
          </a>
          <div class="content">
            <router-link :to="{name: 'ProfileInformation', params: {id: blog.owner_instance.pk}}">
              {{blog.owner_instance.username}}
            </router-link>
            <p>{{ blog.owner_instance.bio }}</p>
            <button @click="addfriend" id="addfriend-btn">Add Friend</button>
            <p>{{ blog.view_num }} views</p>
            <FollowButton 
             :_content_owner=blog.owner_instance
             :_visitor=user />
          </div>
        </div>
        <div class="taggroup" v-if="blog.tags.length != 0">
          <a href class="tag" v-for="tag in blog.tags" :key="tag.pk">
            <img class="icon" src="@/assets/img/标签.svg" alt />
            {{ tag.tag_name }}
          </a>
        </div>
      </div>
      <div class="content" v-html="blog.m_content" v-highlight></div>
      <div class="sidebar">
        <div class="relatedblog">
          <ul>
            <li>
              <a href>博客名</a>
              <span>游览量2233</span>
            </li>
            <li>
              <a href>博客名</a>
              <span>游览量2233</span>
            </li>
            <li>
              <a href>博客名</a>
              <span>游览量2233</span>
            </li>
            <li>
              <a href>博客名</a>
              <span>游览量2233</span>
            </li>
          </ul>
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
      <div class="comment">
      <h2>Comments:</h2>
      <show-comments v-if="blog != '' && root_comment_tree != ''"
        :root_id="blog.root_comment" 
        :is_root="true"
        :_fold="false">
      </show-comments>
      </div> 
    </div>
  </div>
</template>

<script>
import Blog from "@/assets/utils/models/Blog";
import Comment from "@/assets/utils/models/Comment"
import Navbar from "@/components/Navbar.vue";
import { login_required } from "@/assets/utils/auth";
import User from "@/assets/utils/models/User";
import Followership from "@/assets/utils/models/Followership";
import ShowComments from '@/components/ShowComments.vue'
import FollowButton from '@/components/FollowButton'
import AddFriend from '@/components/AddFriend.vue'

export default {
  name: "ShowBlog",
  components: {
    Navbar,
    ShowComments,
    FollowButton,
    AddFriend
  },
  data() {
    return {
      blog: '',
      user: '',
      followership:'',
      followinguser:'',
      followeruser:'',
      followerlists:'',
      deleteid:'',
      content: 'follow',
      liked: true,
      history: '',
      status: false,
      top: 0
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

    like() {
      login_required(this, () => {
        this.blog.like().then(() => {
          this.blog.getLikeHistory()
          .then(history => this.history=history)
        })
      })
    },

    dislike() {
      login_required(this, () => {
        this.blog.dislike().then(() => {
          this.blog.getLikeHistory()
          .then(history => this.history=history)
        })
      })
    },
    addfriend(){
      this.status = !this.status
    },
    closealert(val){
      this.status = val
    },
  },
  created() {
    login_required(this, user => {
      this.user = user
      this.$store.commit('set_root_comment_tree', '')
      Blog.get(this.$route.params.id)
      .then(blog => {
        this.blog = blog
        Comment.query_sub_comments(blog.root_comment)
        .then(comment_tree => {
          let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
          this.$store.commit('set_root_comment_tree', wrapped_comment_tree)
          this.$store.commit('set_root_id', this.blog.root_comment)
        })
        blog.getLikeHistory().then(history => this.history = history)
      })
    })
  },
  computed: {
    root_comment_tree: function() {
      return this.$store.state.root_comment_tree
    }
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
  height: 100%;
}
.blog {
  background-color: #fff;
  z-index: 1;
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "title  title"
    "content sidebar"
    "buttons buttons"
    "comment comment";
  grid-template-columns: 85% 15%;
  justify-items: stretch;
  align-self: start;
  margin-left: 10%;
  line-height: 30px;
  margin-top: 45%;
  padding: 5% 0 0 5%;
  font-family: Merriweather, Georgia, "Times New Roman", serif;
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
h1{
  text-align: center;
  margin-bottom: 20px;
}
.content {
  grid-area: content;
}
.sidebar {
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
.user {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 2% 1% 2% 1%;
}
.user a {
  width: 20%;
}
.user div {
  width: 60%;
}
.user div p {
  font-size: 16px;
  word-break: break-all;
}
button {
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  width: 14vw;
  height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin: 3vh 2vw;
}
.img img {
  top: 64px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.tag {
  display: block;
  background-color: #e16531;
  border-radius: 10px;
  width: auto;
  max-width: 120px;
  max-height: 60px;
  height: auto;
  margin: 20px;
}
.icon {
  width: 40%;
}
.likegroup {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 25%;
  left: 5%;
}
.likegroup img {
  width: 50%;
  background-color: rgb(209, 204, 204);
  margin-top: 20px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.top {
  position: fixed;
  right: 0;
  bottom: 10%;
}
.top img {
  width: 50%;
}
.relatedblog {
  background: #fdcb6e;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
}
.relatedblog span {
  display: block;
  font-size: 12px;
}
.relatedblog li {
  margin: 10px 5px;
}
.taggroup{
  display: flex;
  justify-content: baseline;
  flex-wrap: wrap;
}
.comment {
  grid-area: comment;
  display: block;
  margin: 5% 2%;
}
.comment img {
  width: 10%;
}
.comment li {
  margin: 20px 10px;
}
.comment li div{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.comment li div div{
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 1280px) {
  .ShowBlog {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
  }
  .img img {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }
  .blog {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
      "title"
      "content"
      "buttons"
      "comment"
      "sidebar";
    grid-template-columns: 100%;
    justify-items: stretch;
    align-content: center;
    line-height: 30px;
    padding: 5% 0;
    margin: 0;
    font-family: Merriweather, Georgia, "Times New Roman", serif;
    font-weight: 300;
    font-size: 18px;
    color: #262d3d;
    box-shadow: rgba(0, 0, 0, 0.2);
  }
  .content{
    width: 100%;
    height: 100%;
  }
  .buttons{
    display: flex;
    flex-direction: row;
  }
  .comment {
    grid-area: comment;
  }
  .comment img {
    width: 10%;
  }
  .comment li {
    margin: 20px 10px;
  }
  .comment li div{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .comment li div div{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  .taggroup {
    display: none;
  }
  .relatedblog {
    width: 100%;
  }
}
</style>
