<template>
  <div class="container" id="discussion">
    <div class="content">
      <h1>PUT OUR HEADS TOGETHER</h1>
      <p>We are easily fulling into our own logic trap and often not worthwhile spending our entire wonderful sunday
        afternoon tp spot it.Having a fresh point of view can make a big difference.</p>
      <router-link :to="{name:'ShowQuestions'}">
        <el-button type="warning" round class="button">Join the discussion</el-button>
      </router-link>
    </div>
    <div><img src="@/assets/img/DiscussionRight.svg"></div>
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
  @media screen and (max-width: 1120px){
    .container{
      width: 100%;
      display: grid;
      grid-template-areas: 'img'
                           'content';
      padding: 0;
    }
    .container > div:nth-child(2) {
      padding: 0;
      flex: 0;
    }
    .content{
      grid-area: content;
      margin-bottom: 20px;
    }

  }
</style>
<style>
  .button {
    background: #FFF4E8;
    border-radius: 12px;
    font-size: 2em;
    padding: 20px 20px;
    border: none;
    margin: 20px;
    color: #585858;
  }

</style>
