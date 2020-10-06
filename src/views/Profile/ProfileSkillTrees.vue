<template>
  <div class="SkillTree">
    <canvas id="SkillTree"></canvas>
  </div>
</template>

<script>
import {getCanvas} from '@/assets/utils/models/SkillTree.js'
import SkillTree from '@/assets/utils/models/SkillTree.js'
export default {
    name: "SkillTree",
    data() {
        return {
            tree: ''
        }
    },
    mounted() {
        const canvas = getCanvas("SkillTree")
        SkillTree.get(4).then(tree => {
            window.tree = tree
            this.tree = tree
            canvas.register.push(tree)
            canvas.fresh()
            //tree.draw(canvas.getContext('2d'), canvas.width, canvas.height)
        })
    }
}
</script>

<style scoped>

</style>
