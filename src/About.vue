<template>
  <div class="about" id="about">
    <div class="center"><h1>----ABOUT US----</h1></div>
    <div class="about-under">
      <div><img src="@/assets/img/undraw_annotation_7das.svg"></div>
      <div><p><strong>WE ARE</strong> software engineering students and trying our best to make the best of our
        free time. We love to share knowledge with everyone and hopefully contribute our work to a better
        society</p></div>
      <div><p><strong>WE WANT</strong> to share our knowledge and experiences with anyone who is enthusiastic
        about technology, to learn from the experienced, to make friends with people that are willing to share.
      </p></div>
      <div><img src="@/assets/img/undraw_hang_out_h9ud.svg"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>
  .about {
    background: #D6C1B4;
    padding: 0 100px 100px 20px;
  }

  .center {
    text-align: center;
  }

  .about p {
    color: #736359;
    background: #EFDAC3;
    font-size: 1.8em;
    margin: 0;
    padding: 10px;
  }

  .about img {
    width: 100%;
    height: 100%;
  }

  .about-under {
    display: grid;
    grid-template-columns: 500px 500px;
    grid-template-rows: 300px 300px;
    padding: 0 100px 0 100px;
  }

  .about-under > div:nth-child(1) {
    background: white;
  }

  .about-under > div:nth-child(4) {
    background: white;
  }

  .about-under > div:nth-child(2) {
    padding: 23px 33px 0 0;
  }

  .about-under > div:nth-child(3) {
    padding-left: 33px;
  }

</style>
