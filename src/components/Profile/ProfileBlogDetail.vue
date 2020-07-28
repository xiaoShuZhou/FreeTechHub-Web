<template>
  <div class="ProfileBlogDetail">
    <div class="header">
      <ul>
        <li>My courses</li>
        <li>Purchases</li>
        <li>Help</li>
      </ul>
    </div>
    <div class="main" id="main">
      <img src="@/assets/img/landing.jpg" alt />
      <h2 class="title">Blog Title</h2>
      <p>This is the content of blog...</p>
      <button>View More</button>
      <v-icon iconClass></v-icon>
    </div>
    <div class="sidebar">
      <div class="box">
        <p>发布时间in7-27</p>
      </div>
      <div class="box">
        <p>游览量</p>
      </div>
      <div class="box">
        <p>点赞数</p>
      </div>
      <div class="box">
        <p>标签数7</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  background: #f3f3fc;
}
.ProfileBlogDetail {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: space-around;
  flex-wrap: wrap;
}
.ProfileBlogDetail div:nth-child(2) {
  flex-grow: 8;
  padding-left: 60px;
}
.header {
  width: 300px;
  flex-grow: 2;
}
li {
  list-style: none;
  float: left;
  padding-left: 30px;
  padding-top: 40px;
}
img {
  max-width: 480px;
  max-height: 270px;
  margin: 0px;
}
button {
  background-color: #2c2c2c;
  color: white;
  border-radius: 10px;
  border: none;
  width: 80px;
  height: 40px;
  margin-top: 30px;
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.box {
  width: 150px;
  height: 120px;
  margin: 30px;
  border: dashed #eae6fc;
  border-width: 2px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.box > p {
  text-align: center;
  margin: 0;
  
}
</style>