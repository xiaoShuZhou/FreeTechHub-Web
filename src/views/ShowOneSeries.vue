<template>
  <div class="ShowOneSeries">
    <Navbar/>
    <h1>{{series}}</h1>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Series from '@/assets/utils/models/Series'

export default {
  name: "ShowOneSeries",
  components: {
    Navbar
  },
  data() {
    return {
      series: null
    }
  },
  created() {
    console.log(this.$route)
    Series.get(this.$route.params.id).then(series => {
      this.all_series = series
    })
  }
}
</script>

<style scoped>

</style>