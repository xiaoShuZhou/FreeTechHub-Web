<template>
  <div>
    SkillTrees
  </div>
</template>

<script>
import Skilltree from '@/assets/utils/models/Skilltree'
Skilltree.get(4).then(tree => {
    tree.get_tree().then(s_tree => console.log(s_tree))
})
export default {

}
</script>

<style scoped>

</style>
