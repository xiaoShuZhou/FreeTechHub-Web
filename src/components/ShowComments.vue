<template>
  <div v-if="comment_tree != null" class="ShowComments">
    <ul>
      <div class="card">
        <div v-if="is_root == false"> 
          <h2 class="card-title">By {{ comment_tree.comment.owner_instance.username }} at {{ comment_tree.comment.time }}</h2>
          <div v-if="comment_tree.comment.owner_instance.pk == user.pk">
            <button @click="deleteComment(comment_tree.comment)">Delete</button>
          </div>
          <p class="content" v-html='comment_tree.comment.content'></p>
          <div v-if="comment_tree.comment.status == false">
            <button @click="replyTo(comment_tree.comment)">Reply To</button>
          </div>
          <div v-else>
            <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
            <button @click="saveComment(comment_tree.comment)">Save</button>
            <button @click="cancel(comment_tree.comment)">Cancel</button>
          </div>
          <div v-if="is_root == false">
            <div v-if="comment_tree.sub_comment_ids.length != 0">
              <button v-if="fold == true" @click="toggleChildren">Check out reply</button>
              <button v-if="fold == false" @click="toggleChildren">Stow reply</button>
            </div>
          </div>
          <hr>
        </div>
        <div v-if="comment_tree.sub_comment_ids.length != 0">
          <li v-for="comment_id in comment_tree.sub_comment_ids" :key="comment_id">
            <show-comments v-if="fold==false"
              :root_id="comment_id" 
              :is_root="false"
              :_fold="true"
              :key="comment_id">
            </show-comments>
          </li>
        </div>
      </div>
    </ul>
    <div v-if="is_root == true">
      <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
      <button @click="saveComment(comment_tree.comment)">Post a comment</button>
    </div>
  </div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment'
import {login_required} from '@/assets/utils/auth'

export default {
	name:"ShowComments",
	props: ['root_id', 'is_root', '_fold'],
	data(){
		return {
			comment_tree:'',
			comment_content:'',
      fold: this._fold,
      user:'',
		}
	},
	methods: {
    _getComment(comment){
      return new Comment({
        content:this.comment_content,
        sub_comments_of:comment.pk
      })
    },

    replyTo(comment){
      this.fold = false
      comment.status = true
    },

    cancel(comment){
      comment.status = false
    },

    //reset comment tree after adding or deleting comment
    resetCommentTree(){
      Comment.query_sub_comments(this.$store.state.root_id)
        .then(comment_tree => {
          let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
          this.$store.commit('set_root_comment_tree', wrapped_comment_tree)
          this.comment_tree = Comment.get_matched_comment_tree(this.$store.state.root_comment_tree, this.root_id)
        })
    },

    //add new comment
    saveComment(comment){
      let parent_comment = this._getComment(comment)
      parent_comment.save().then(() => {
        this.comment_content = ''
        this.resetCommentTree()
      })
    },
    
    //delete comment
    deleteComment(comment){
      comment.delete().then(() => {
        this.resetCommentTree()
      })
    },

    //toggle status of fold
    toggleChildren(){
      this.fold = !this.fold
    }
	},
	created() {
    //use login_required to fetch current online user
    login_required(this, user => {
      this.user = user
    })
    this.comment_tree = Comment.get_matched_comment_tree(this.$store.state.root_comment_tree, this.root_id)
  }
}
</script>
