<template>
  <div class="ProfileFollow">
    <div class="Follower">
      <h2>Follower</h2>
      <ul></ul>
    </div>
    <div class="Following">
      <h2>Following</h2>
    </div>
  </div>
</template>

<script>
export default {
  name:"ProfileFollow",
};
</script>

<style scoped>
* {
  width: 50vh;
  height: 100vh;
  background: #ffeef3;
}
.ProfileFollow {
  display: grid;
  grid-template-areas: "Follower Following";
  text-align: center;
  justify-items: center;
}
div div h2{
  position: fixed;
  top: 100px;
}
</style>

