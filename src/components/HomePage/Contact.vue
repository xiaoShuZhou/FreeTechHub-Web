<template>
  <div class="container">
    <div>
      <h1>We <span class="love"></span> new friends!</h1>
      <p>We are really looking forward to seeing more creative people in our project and make this project useful
        for as many people as possible. If you already have some programming experience inPython and know how to
        use Git and Github to participate in open source projects you can simply visit our Github repository and
        make your creative changes! If you don't have any programming experience, don't worry, we have complete
        programming and git tutorials to help you easily get there.</p>
    </div>
    <div class="buttons">
      <button>Tutorial</button>
      <button>FTH Project</button>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    background: #FFF4E8;
    padding: 0 200px 50px 200px;
  }

  .container > div:nth-child(1) {
    text-align: center;
  }

  .container > div:nth-child(2) {
    display: flex;
    justify-content: space-around;
  }

  .love {
    width: 50px;
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    background: url("~@/assets/img/love.svg");
    background-size: 50px 50px;
  }

  h1 {
    font-size: 2.5em;
    color: #736359;
  }

  p {
    color: #736359;
    font-size: 1.5em;
  }

  button {
    background: #D6C4BE;
    border-radius: 12px;
    font-size: 1em;
    padding: 20px 20px;
    border: none;
  }
  @media screen and (max-width: 750px){
    .container {
      width: 100%;
      padding: 0;
    }
    .buttons{
      margin-bottom: 20px;
    }
  }
</style>
