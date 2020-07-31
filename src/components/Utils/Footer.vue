<template>
  <div class="footer">
    <div class="contact">
      <h2 class="links">About * Contact * Rules</h2>
      <p class="site">FreeTechHub - 2020</p>
    </div>
    <div class="social">
      <v-icon iconClass="qq" alt="qq" class="icon"></v-icon>
      <v-icon iconClass="github" alt="github" class="icon"></v-icon>
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
    width: 100vw;
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

  .icon {
    height: 80%;
    padding-top: 5%;
    padding-bottom: 5%;
    align-self: center;
  }
</style>
