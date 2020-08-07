<template>
  <div class="blogdetail">
    <div class="blog">
      <div class="name">
        <h2>博客名</h2>
      </div>
      <div class="content">
        <p>博客内容</p>
      </div>
    </div>
    <div class="box">
      <div id="box1">回答数2233</div>
      <div id="box2">游览量</div>
      <div id="box3">点赞数</div>
      <div id="box4">发布时间</div>
    </div>
    <div class="buttongroup">
      <button type="button" class="edit">Edit</button>
      <button type="button" class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
* {
  background: #f3f3fc;
}
.blogdetail{
  display: grid;
  grid-gap: 10px;
  grid-template-areas: 'blog 					box'
                       'buttongroup 	box';
  grid-template-columns: 70% 30%;
  grid-template-rows: 70% 30%;
  align-content: center;
}
.blog{
  border: 2px solid black;
  grid-area: blog;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-area: box;
}
.box div{
  width: 100px;
  height: 60px;
  border: 1.5px dashed black;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}

.buttongroup{
  grid-area: buttongroup;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.buttongroup button{
  margin: 10px;
  outline: none;
}

.edit{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: paleturquoise;
  color: white;
}
.delete{
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
}
</style>
