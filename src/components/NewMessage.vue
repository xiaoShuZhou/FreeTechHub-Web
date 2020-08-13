<template>
  <div class="New">
    <img src="@/assets/img/new.svg" alt="new">
    {{number}}
  </div>
</template>

<script>
export default {
  name: "New",
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
.New {
  width: 3vw;
  display: flex;
  color: red;
}
</style>
