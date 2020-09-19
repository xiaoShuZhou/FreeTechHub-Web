<template>
  <div v-if="comment_tree != null" class="ShowComments">
    <ul>
      <div v-if="answer == true">
        <div v-if="is_root == true ">
            <div v-if="is_reply == true">
              <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
              <button @click="saveComment(comment_tree.comment)">Post a comment</button>
              <button @click="is_reply = false">Cancel</button>
            </div>
            <div v-else>
              <button @click="is_reply = true">replyToAnswer</button>
            </div>
        </div>
      </div>
      <div class="card">
        <div v-if="is_root == false"> 
          <h2 class="card-title">By {{ comment_tree.comment.owner_instance.username }} at {{ comment_tree.comment.time }}</h2>
          <div v-if="comment_tree.comment.owner_instance.pk == _user.pk">
            <button @click="deleteComment(comment_tree.comment)">Delete</button>
          </div>
          <p class="content" v-html='comment_tree.comment.m_content' v-highlight></p>
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
            <show-comments @updatedTree="updatedTree" v-if="fold==false && comment_tree != ''"
              :node_id="comment_id"
              :root_id="root_id"
              :wrapped_tree="wrapped_tree"
              :is_root="false"
              :_fold="true"
              :key="comment_id"
              :_user="_user">
            </show-comments>
          </li>
        </div>
      </div>
    </ul>
    <div v-if="blog == true">
      <div v-if="is_root == true">
          <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
          <button @click="saveComment(comment_tree.comment)">Post a comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment'

export default {
	name:"ShowComments",
	props: ['node_id', 'root_id', 'wrapped_tree', 'is_root', '_fold', '_blog', '_answer', '_user'],
	data(){
		return {
			comment_tree:'',
			comment_content:'',
      fold: this._fold,
      blog:this._blog,
      answer:this._answer,
      is_reply:false,
		}
	},
	methods: {
    _getComment(comment){
      return new Comment({
        content: this.comment_content,
        sub_comments_of: comment.pk
      })
    },

    replyTo(comment){
      comment.status = true
    },

    cancel(comment){
      comment.status = false
    },

    //reset comment tree after adding or deleting comment
    resetCommentTree(){
      Comment.query_sub_comments(this.root_id)
        .then(comment_tree => {
          let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
          this.$emit('updatedTree', wrapped_comment_tree)
        })
    },

    //add new comment
    saveComment(comment){
      this.fold = false
      this.is_reply =false
      comment.status = false
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
    },

    updatedTree(wrapped_comment_tree){
      this.$emit('updatedTree', wrapped_comment_tree)
    }
	},
	created() {
    this.comment_tree = Comment.get_matched_comment_tree(this.wrapped_tree, this.node_id)
  },
  watch: {
    wrapped_tree(val) {
      this.comment_tree = Comment.get_matched_comment_tree(val, this.node_id)
    }
  }
}
</script>
