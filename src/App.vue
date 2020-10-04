<template>
  <div id="app">
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style scoped>
*{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
