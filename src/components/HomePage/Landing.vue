<template>
  <div class="landing">
    <div class="shadow"><p>The free land of technology</p></div>
    <img src="@/assets/img/landing.jpg">
  </div>
</template>

<script>
  export default {
    name: "Landing",
  }
</script>

<style scoped>
  .landing {
    position: relative;
    padding: 0;
    background: #C99774;
    width: 100%;
    height: 400px;
    text-align: center;
  }

  .landing img {
    height: 100%;
    width: 90%;
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 5%;
    background-color: black;
    width: 90%;
    height: 100%;
    filter: opacity(40%);
  }

  .shadow p {
    position: absolute;
    bottom: 1%;
    left: 5%;
    color: white;
    font-size: 45px;
  }
</style>
