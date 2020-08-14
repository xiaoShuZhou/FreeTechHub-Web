<template>
  <div class="philosophy">
    <div class="left"><img src="@/assets/img/warm.jpg"></div>
    <div class="right"><h1>Our philosophy</h1>
      <p><span></span><strong>LESS IS MORE</strong></p>
      <p><span></span><strong>HIGH BAND WIDTH BEATS LOW BAND WIDTH</strong></p>
      <p><span></span><strong>SHARING IS CARING</strong></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Philosophy"
  }
</script>

<style scoped>
  .philosophy {
    background: #FFFFFF;
    display: flex;
    padding: 2em;
  }

  .philosophy .left {
    flex: 2;
  }

  .philosophy .right {
    flex: 1;
    padding-left: 2em;
    text-align: center;
  }

  .philosophy img {
    max-width: 100%;
    height: auto;
  }

  h1 {
    color: #C56B47;
  }

  p {
    color: #A8364C;
  }
@media screen and (max-width: 516px){
  .philosophy{
    display: flex;
    flex-direction: column;
  }
}
</style>
