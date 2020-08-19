<template>
  <div class="StarBackground" ref="StarBackground">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'StarBackground',
  mounted(){
    let _this = this
    _this.$refs.StarBackground.width = document.documentElement.scrollWidth
    _this.$refs.StarBackground.height =  document.documentElement.scrollHeight 
    function Star(id, x, y){
      this.id = id
      this.x = x
      this.y = y
      this.r = Math.floor(Math.random()*2) + 1;
      var alpha = (Math.floor(Math.random() * 10 ) +1 ) /10 /2
      this.color = "rgba(255,255,255," + alpha + ")"
    }
    Star.prototype.draw = function() {
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 *Math.PI, false)
      ctx.closePath()
      ctx.fill()
    }
    Star.prototype.move = function() {
      this.y -= 1
      if(this.y <= -10) this.y = _Height + 10
      this.draw()
    }
    Star.prototype.die = function() {
      stars[this.id] = null
      delete stars[this.id]
    }
    var canvas = _this.$refs.canvas,
        ctx = canvas.getContext("2d"),
        _Width = _this.$refs.StarBackground.width,
        _Height = _this.$refs.StarBackground.height,
        stars = [],
        initStarsPopulation = 80;
    function setCanvasSize() {
      canvas.setAttribute('width', _Width)
      canvas.setAttribute('height', _Height)
    }
    function __init__(){
      ctx.strokeStyle = 'white';
      ctx.shadowColor = 'white';
      for(var i =0; i < initStarsPopulation; i++){
        stars[i] = new Star(i, Math.floor(Math.random() * _Width), Math.floor(Math.random() * _Height))
      }
      ctx.shadowBlur = 0
      animate()
    }
    function animate(){
      ctx.clearRect(0, 0, _Width, _Height)
      for(var i in stars){
        stars[i].move()
      }
      requestAnimationFrame(animate)
    }
    setCanvasSize()
    __init__()
  },
}
</script>

<style>
.StarBackground{
  z-index: -1;
  top: 10vh;
  height: 100%;
  width: 100%;
  position: fixed;
  background: radial-gradient(225% 105% at bottom center, #f7f7b6 10%, #e96f92 40%, #75517d 65%, #1b2947);
}
</style>
