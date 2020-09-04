<template>
  <div class="FollowButton"
    v-if="_visitor.pk != _content_owner.pk && followed != 'loading'">
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
      followed: this._followed != undefined ? this._followed : 'loading'
    }
  },
  methods: {
    follow() {
      this._visitor.follow(this._content_owner.pk)
      .then(() => this.followed = true)
    },
    unfollow() {
      this._visitor.unfollow(this._content_owner.pk)
      .then(() => this.followed = false)
    },
    load() {
      if (this._visitor.pk != this._content_owner.pk
          && this.followed == 'loading') {
        this._visitor.is_followed(this._content_owner.pk)
        .then(res => this.followed = res)
      }
    }
  },
  created() {
    this.load()
  },
}
</script>

<style scoped>

</style>
