<template>
  <div>
    SkillTrees
  </div>
</template>

<script>
import SkillTree from '@/assets/utils/models/Skilltree.js'
SkillTree.get(4).then(tree => window.tree = tree)
export default {

}
</script>

<style scoped>

</style>
