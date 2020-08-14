<template>
  <div class="discription">
    <div class="knowledge">
      <h1>THE HOLY LAND OF KNOWLEDGE SHARING</h1>
    </div>
    <div>
      <starbar></starbar>
    </div>
    <div class="section">
      <p>FreeTechHub is the place where we are share our newly learned knowledge to our best friends,and to admire the
        beauty of the great human wisdom together</p>
    </div>
  </div>
</template>

<script>
  import starbar from "@/components/Utils/starbar"

  export default {
    name: "Discription",
    components: {
      starbar,
    }
  }
</script>

<style scoped>
  .discription {
    background: #C99774;
    padding-bottom: 150px;
  }

  .discription > div:nth-child(2) {
    display: flex;
    justify-content: center;
  }

  .knowledge {
    padding: 2em 4em 1em 4em;
    text-align: center;
  }

  .section {
    margin: 0 auto;
    width: 40%;
    text-align: center;
  }

  h1, p {
    color: aliceblue;
  }
@media screen and (max-width: 516px) {
  .knowledge{
    padding-top: 6vh;
  }
}
@media screen and (max-width: 343px) {
  .knowledge{
    padding-top: 15vh;
  }
}
</style>
