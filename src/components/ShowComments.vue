<template>
    <div class="ShowComments">
			<div v-if="is_root == true">
				<mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
				<button @click="saveComment(comment_tree.comment)">Post a comment</button>
			</div>
			<ul>
				<div class="card">
					<div v-if="is_root == false">
						<h2 class="card-title">By {{ comment_tree.comment.owner }} at {{ comment_tree.comment.time }}</h2>
            <div v-if="comment_tree.comment.owner == user">
              <button @click="Delete(comment_tree.comment)">Delete</button>
            </div>
						<p class="content" v-html='comment_tree.comment.content'></p>
						<div v-if="comment_tree.comment.status == false">
							<button @click="ReplyTo(comment_tree.comment)">Reply To</button>
						</div>
						<div v-else>
							<mavon-editor :ishljs = "true" :preview="true" v-model="sub_comment_content"  placeholder="What do you want to post" />
							<button @click="saveSubComment(comment_tree.comment)">Save</button>
							<button @click="Cancel(comment_tree.comment)">Cancel</button>
						</div>
						<hr>
					</div>
					<div v-if="comment_tree.sub_comment_ids.length != 0">
						<li v-for="comment_id in comment_tree.sub_comment_ids" :key="comment_id">
							<show-comments :root_id="comment_id" :blog_id="blog_id" :is_root="false"></show-comments>
						</li>
					</div>
				</div>
			</ul>
    </div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment'
import {login_required} from '@/assets/utils/auth'

export default {
	name:"ShowComments",
	props: ['root_id','blog_id', 'is_root'],
	data(){
		return {
			comment_tree:'',
			comment_content:'',
			sub_comment_content:'',
      owner:'',
      user:'',
		}
	},
	methods: {
    _getComment(comment){
      return new Comment({
        id:this.id,
        content:this.comment_content,
        owner: this.owner,
        sub_comments_of:comment.pk
      })
    },

    _getSubComment(comment){
      return new Comment({
        id:this.id,
        content:this.sub_comment_content,
        owner:this.owner,
        sub_comments_of:comment.pk
      })
    },

    ReplyTo(comment){
      comment.status = true
    },

    Cancel(comment){
      comment.status = false
    },

    setCommentTree(comment_tree){
      let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
      this.$store.commit('set_root_comment_tree', wrapped_comment_tree)
      this.comment_tree = Comment.get_matched_comment_tree(this.$store.state.root_comment_tree, this.root_id)
    },

    saveComment(comment){
      let parent_comment = this._getComment(comment)
      parent_comment.save().then(() => {
        Comment.query_sub_comments(this.root_id)
        .then(comment_tree => {
          this.setCommentTree(comment_tree)
        })
      })
    },

    saveSubComment(comment){
      comment.status = false
      let sub_comment = this._getSubComment(comment)
      sub_comment.save().then(() => {
        Comment.query_sub_comments(this.$store.state.root_id)
        .then(comment_tree => {
          this.setCommentTree(comment_tree)
        })
      })
    },
    
    Delete(comment){
      comment.delete().then(() => {
        Comment.query_sub_comments(this.$store.state.root_id)
        .then(comment_tree => {
          let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
          this.$store.commit('set_root_comment_tree', wrapped_comment_tree)
          this.comment_tree = Comment.get_matched_comment_tree(this.$store.state.root_comment_tree, this.$store.state.root_id)
        })
      })
    }
	},
	created() {
    login_required(this, user => {
      this.user = user.pk
    })
    this.comment_tree = Comment.get_matched_comment_tree(this.$store.state.root_comment_tree, this.root_id)
    }
}
</script>
