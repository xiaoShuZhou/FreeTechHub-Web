<template>
  <div class="NewMessage">
    <img src="@/assets/img/new.svg" alt="new">
    {{number}}
  </div>
</template>

<script>
export default {
  name: "NewMessage",
  props: ["num"],
  data() {
    return {
      number: this.num
    }
  },
  watch: {
    num: {
      handler: function(newVal) {
        this.number = newVal
      },
    }
  }
}
</script>

<style scoped>
.NewMessage {
  display: flex;
  color: red;
}

.NewMessage img {
    height: 4vh;
}
</style>
