<template>
  <div class="FollowButton" 
    v-if="visitor.pk != content_owner.pk && followed != 'loading'">
    <button v-if="followed" @click="unfollow()">unfollow</button>
    <button v-else @click="follow()">follow</button>
  </div>
</template>

<script>
export default {
  name: "FollowButton",
  props: ['_visitor', '_content_owner', '_followed'],
  data() {
    return {
      visitor: this._visitor,
      content_owner: this._content_owner,
      followed: 'loading'
    }
  },
  methods: {
    follow() {
      this.visitor.follow(this.content_owner.pk)
      .then(() => this.followed = true)
    },
    unfollow() {
      this.visitor.unfollow(this.content_owner.pk)
      .then(() => this.followed = false)
    }
  },
  created() {
    if (this.visitor.pk != this.content_owner.pk 
        && this.followed == 'loading') {
      this.visitor.is_followed(this.content_owner.pk)
      .then(res => this.followed = res)
    }
  }
}
</script>

<style scoped>

</style>