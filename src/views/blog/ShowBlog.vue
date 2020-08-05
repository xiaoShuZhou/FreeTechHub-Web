<template>
  <div class="ShowBlog">
    <Navbar />
    <img src="@/assets/img/landing.jpg" id="img"/>

    <div class="blog">
      <h1 class="title">{{ blog.title }}</h1>
      <div class="user">
        <h3>{{blog.owner}}</h3>
      </div>
      <div class="content" v-html="blog.m_content" v-highlight></div>
      <div class="buttons">
        <img src="@/assets/img/like.svg" @click="like" v-if="history=='liked'" alt="like-icon" />
        <img src="@/assets/img/like-o.svg" @click="like" v-else alt="like-icon" />
        <img
          src="@/assets/img/dislike.svg"
          @click="dislike"
          v-if="history=='disliked'"
          alt="dislike-icon"
        />
        <img src="@/assets/img/dislike-o.svg" @click="dislike" v-else alt="dislike-icon" />

        <button @click="editBlog">Edit</button>
        <button @click="deleteBlog">Delete</button>
        <button @click="followingship">{{content}}</button>
      </div>
    </div>
    <div class="comment">
      <mavon-editor
        :ishljs="true"
        :preview="true"
        v-model="comment"
        placeholder="Post your comment"
      />
      <button>Post</button>
    </div>
  </div>
</template>

<script>
import Blog from "@/assets/utils/models/Blog";
import Navbar from "@/components/Navbar.vue";
import { login_required } from "@/assets/utils/auth";
import User from "@/assets/utils/models/User";
import Followership from "@/assets/utils/models/Followership";
import axios from "axios";


export default {
  name: "ShowBlog",
  components: {
    Navbar,
  },
  data() {
    return {
      blog: "",
      followinguser: "",
      followeruser: "",
      followerlists: "",
      deleteid: "",
      content: "follow",
      liked: true,
      history: "",
      comment: "",
    };
  },
  methods: {
    init() {
      let follower_id = [];
      if (!this.followerlists) return;

      this.followerlists.forEach((followerlist) => {
        follower_id.push({
          following_id: followerlist.following,
          id: followerlist.id,
        });
      });

      follower_id.forEach((item) => {
        if (item.following_id == this.followinguser.pk) {
          this.deleteid = item.id;
          this.liked = false;
          this.content = "unfollow";
        } else {
          this.liked = true;
          this.content = "Follow";
        }
      });
    },
    deleteBlog() {
      this.blog.delete().then(() => {
        this.$router.push({ name: "ShowBlogs" });
      });
    },
    editBlog() {
      this.$router.push({ name: "EditBlog" });
    },

    like() {
      login_required(this, () => {
        this.blog.like().then(() => {
          this.blog
            .getLikeHistory()
            .then((history) => (this.history = history));
        });
      });
    },

    dislike() {
      login_required(this, () => {
        this.blog.dislike().then(() => {
          this.blog
            .getLikeHistory()
            .then((history) => (this.history = history));
        });
      });
    },

    followingship() {
      if (this.liked) {
        this.content = "unfollow";
        this.liked = !this.liked;
        Blog.get(this.$route.params.id).then((blog) => {
          this.blog = blog;
        }),
          User.get(this.blog.owner).then((user) => {
            (this.user = user),
              axios.post(`http://127.0.0.1:8000/user/followership/`, {
                following: this.followinguser.pk,
                follower: this.followeruser.pk,
              });
          });
      } else {
        this.content = "follow";
        User.getSelf().then((user) => {
          (this.followeruser = user),
            (this.followerlists = this.followeruser.follower_users);
          let follower_id = [];
          if (!this.followerlists) {
            return;
          }
          this.followerlists.forEach((followerlist) => {
            follower_id.push({
              following_id: followerlist.following,
              id: followerlist.id,
            });
          });
          follower_id.forEach((item) => {
            if (item.following_id == this.followinguser.pk) {
              this.deleteid = item.id;
            } else {
              console.log("ERR");
            }
          });
          Followership.get(this.deleteid).then((followership) => {
            followership.delete();
          });
        });
        this.liked = !this.liked;
      }
    },
  },
  created() {
    login_required(this, (user) => {
      Blog.get(this.$route.params.id).then((blog) => {
        this.blog = blog;

        this.followeruser = user;
        this.followerlists = this.followeruser.follower_users;
        this.init();

        User.get(this.blog.owner).then((user) => {
          this.followinguser = user;
          this.init();
        });
        blog.getLikeHistory().then((history) => (this.history = history));
      })
    })
  },
};
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
  margin-top: 40%;
}
img {
  padding-top: 40px;
  margin-bottom: -150px;
  position: absolute;
  z-index: -1;
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
.user{
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin: 0 20px 0 20px;
  padding: 20px 0 20px 0;
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
</style>
