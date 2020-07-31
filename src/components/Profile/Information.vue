<template>
  <div class="box">
    <div class="box1">
      <div id="image">
        <img src="1.jpg" />
      </div>
      <div>
        <p>Major SE</p>
        <p>Balance 1000</p>
        <p>garde 2018</p>
        <p>Bio Stay hungry, Stay foolish</p>
      </div>
    </div>
    <div class="box2">
      <div id>
        <v-icon iconClass="游览量"></v-icon>
        <p>Total views: 666</p>
        <v-icon iconClass="粉丝趴"></v-icon>
        <p>Follows: 0438</p>
        <br>
        <v-icon iconClass="点赞"></v-icon>
        <p>Total likes: 2233</p>
        <v-icon iconClass="概率"></v-icon>
        <p>Accept rate: 99%</p>
      </div>
      <div id>
        <img src="@/assets/logo.png" />
        <img src="@/assets/logo.png" />
      </div>
    </div>
    <div class="box3">
      <img src="github活动表.jpg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex;
}
div {
  background: #0162c8;
  padding: 10px;
  margin: 10px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.box1 {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: baseline;
  flex-grow: unset;
}
.box1 div p {
  display: inline;
  padding-left: 30px;
}
.box1 div:nth-child(2) {
  position: relative;
  bottom: 100px;
}
.box2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box2 div p {
  display: inline;
  padding-right: 30px;
}
.box2 div img {
  display: inline;
  width: 90px;
  height: 90px;
  position: relative;
  bottom: 20px;
}
.box3 img {
  border: none;
  border-radius: 0;
  width: 100%;
}
</style>