<template>
  <div class="ProfileFollow">
    <div class="Follower">
      <h2>Follower</h2>
      <div class="FollowerList">
        <ul>
          <li>
            <div>
              <a href="#" class="avatar">
                <v-icon iconClass="头像 女孩" class="avatar"></v-icon>
              </a>
              <div class="user-content">
                <a href="#" class="title">用户名</a>
                <p class="signature">个性签名</p>
              </div>
              <div class="btn">
                <button>已关注</button>
              </div>
            </div>
          </li>
          <li>
            <v-icon iconClass="头像 女孩" class="avatar"></v-icon>
            <a href="#">用户名</a>
          </li>
          <li>
            <v-icon iconClass="头像 女孩" class="avatar"></v-icon>
            <a href="#">用户名</a>
          </li>
          <li>
            <v-icon iconClass="头像 女孩" class="avatar"></v-icon>
            <a href="#">用户名</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="Following">
      <h2>Following</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollow",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  width: 50vh;
  background: #ffeef3;
}
.ProfileFollow {
  height: 100vh;
  display: grid;
  grid-template-areas: "Follower Following";
  text-align: center;
  justify-items: center;
}
div div h2 {
  position: static;
  padding-top: 100px;
  padding-bottom: 50px;
}
.Follower {
  grid-area: Follower;
}
.user-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
}
.FollowerList {
  width: 100%;
  height: 100%;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  text-overflow: ellipsis;
  height: 100%;
  list-style: none;
  font: 1em sans-serif;
  line-height: 2px;
  /* padding-left: 50px; */
}
li {
  position: relative;
  padding-top: 50px;
  border: 0;
  word-break: break-all;
  width: 400px;
  border-bottom: 1px solid black;
  text-align: -webkit-match-parent;
}
li div{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.Following {
  grid-area: Following;
}
.avatar {
  position: relative;
  width: 70px;
  height: 70px;
  /* right: 40px;
  top: 15px; */
  z-index: 20px;
}
.signature {
  display: inline-flex;
}
.title {
  font-weight: 500;
  word-break: break-word;
}
.btn button {
  position: absolute;
  border: 2;
  display: inline;
  border-radius: 5px;
  width: 60px;
  /* right: 30px; */
  vertical-align: middle;
  /* bottom: 30px; */
}
</style>

