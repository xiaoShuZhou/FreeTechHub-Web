<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconClass: {
      type: String,
      required: true,
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
}
</script>

<style>
.svg-icon {
  display: inline-block;
  width: 25px;
  height: 25px;
}
</style>
