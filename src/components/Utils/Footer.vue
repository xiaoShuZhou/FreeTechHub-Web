<template>
  <div class="footer">
    <div class="contact">
      <h2 class="links">About * Contact * Rules</h2>
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
    
}
</script>

<style scoped>
  .footer{
    background: linear-gradient(to left, #ba7453, #d1a884);
    width: 100%;
    height: 10vh;
    display: flex;
    align-content: center;
    justify-content: space-around;
  }
  .contact {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
  .contact h2 {
    margin: 0;
    color: white;
  }
  .contact p {
    margin: 0;
    color: #736359;
    font-size: 1.2rem;
  }

  .social {
    width: 15%;
    display: flex;
    justify-content: space-around;
  }

  img {
    height: 80%;
    padding-top: 5%;
    padding-bottom: 5%;
    align-self: center;
  }
  @media screen and (max-width: 484px){
    .footer{
      height: 100%;
    }
    img {
      width: 100%;
      padding-top: 5%;
      padding-bottom: 5%;
      align-self: center;
    }
  }
</style>
