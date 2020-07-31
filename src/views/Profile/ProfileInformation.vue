<template>
  <div class="box">
    <div class="box1">
      <div id="image">
        <img src="@/assets/img/landing.jpg" />
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
        <img src="@/assets/img/浏览量.svg" alt="">
        <p>Total views: 666</p>
        <img src="@/assets/img/粉丝趴.svg" alt="">
        <p>Follows: 0438</p>
        <br>
        <img src="@/assets/img/点赞.svg" alt="">
        <p>Total likes: 2233</p>
        <img src="@/assets/img/概率.svg" alt="">
        <p>Accept rate: 99%</p>
      </div>
      <div id>
        <img src="@/assets/img/landing.jpg" />
        <img src="@/assets/img/landing.jpg" />
      </div>
    </div>
    <div class="box3">
      <img src="@/assets/img/landing.jpg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex;
}
div {
  background: #f9f6ff;
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
  justify-content: space-around;
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
  justify-content: space-around;
}
.box2 div p {
  display: inline;
  padding-right: 30px;
}
.box2 div img {
  display: inline-block;
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
