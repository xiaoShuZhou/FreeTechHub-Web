<template>
  <div class="Footer">
    <div class="contact">
      <h2 class="links">If you think this website is useful ,please recommend it to your friend.</h2>
      <p class="site">FreeTechHub - 2020</p>
    </div>
    <div class="social">
      <img src="@/assets/img/qq.svg" alt="qq">
      <img src="@/assets/img/github.svg" alt="github">
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.Footer {
  display: flex;
  flex-direction: row;
  background: #ffdcc9;
  width: 100vw;
  height: 10vh;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  bottom: 0;
  position: fixed;
}
img{
  width: 100px;
  height: 100%;
  margin: 0 20px;
}
</style>
