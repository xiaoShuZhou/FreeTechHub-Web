<template>
  <div class="about" id="about">
    <div class="center"><h1>----ABOUT US----</h1></div>
    <div class="about-under">
      <div class="img1"><img src="@/assets/img/undraw_annotation_7das.svg"></div>
      <div class="text1"><p><strong>WE ARE</strong> software engineering students and trying our best to make the best of our
        free time. We love to share knowledge with everyone and hopefully contribute our work to a better
        society</p></div>
      <div class="text2"><p><strong>WE WANT</strong> to share our knowledge and experiences with anyone who is enthusiastic
        about technology, to learn from the experienced, to make friends with people that are willing to share.
      </p></div>
      <div class="img2"><img src="@/assets/img/undraw_hang_out_h9ud.svg"></div>
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
    width: 100%;
    background: #D6C1B4;
    padding: 0 100px 100px 20px;
    box-sizing: border-box;
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
@media screen and (max-width: 1120px){
  .about {
    width: 100%;
    background: #D6C1B4;
    padding: 0;
    height: 100%;
  }
  .center{
    width: 100%;

    padding-top: 2vh;
    padding-bottom: 50px;
  }
  .about-under{
    display: grid;
    grid-template-areas: 'img1'
                         'text1'
                         'img2'
                         'text2';
    grid-template-columns: 100%;
    justify-items: center;
    align-items: center;
    grid-template-columns: auto;
    grid-template-rows: auto;
    font-size: auto;
    grid-row-gap: 20px;
  }
  .about img {
    width: 100%;
    height: 100%;
  }
  .about-under > div:nth-child(1) {
    grid-area: img1;
    width: 100%;
  }
  .about-under > div:nth-child(2) {
    grid-area: text1;
    padding: 0;
  }
  .about-under > div:nth-child(3) {
    grid-area: text2;
    padding: 0;
    width: 100%;

  }
  .about-under > div:nth-child(4) {
    grid-area: img2;
    display: block;
    width: 100%;
    padding-bottom: 20px;
  }
}
@media screen and (max-width: 484px){
  .about-under{
    padding: 0;
  }
}
</style>
