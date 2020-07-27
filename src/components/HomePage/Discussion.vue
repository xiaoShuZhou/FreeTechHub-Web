<template>
  <div class="container">
    <div>
      <h1>PUT OUR HEADS TOGETHER</h1>
      <p>We are easily fulling into our own logic trap and often not worthwhile spending our entire wonderful sunday
        afternoon tp spot it.Having a fresh point of view can make a big difference.</p>
      <button>Join the discussion</button>
    </div>
    <div><img src="@/assets/img/undraw_true_love_cy8x.svg"></div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .container {
    display: flex;
    background: #D6C1B4;
    padding: 50px 0 50px 50px;
  }

  .container > div:nth-child(1) {
    flex: 2;
    text-align: center;
  }

  .container > div:nth-child(2) {
    padding-left: 100px;
    flex: 1;
  }

  button {
    background: #FFF4E8;
    border-radius: 12px;
    font-size: 2em;
    padding: 20px 20px;
    border: none;
  }

  h1 {
    font-size: 2.5em;
    color: #FFF4E8;
  }

  p {
    color: #FFF4E8;
    font-size: 1.5em;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>