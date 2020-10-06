<template>
  <div v-if="comment_tree != null" class="ShowComments">
    <ul>
      <div v-if="answer == true">
        <div v-if="is_root == true ">
            <div v-if="is_reply == true">
              <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
              <el-button @click="saveComment(comment_tree.comment)">Post a comment</el-button>
              <el-button @click="is_reply = false">Cancel</el-button>
            </div>
            <div v-else>
              <el-button @click="is_reply = true">replyToAnswer</el-button>
            </div>
        </div>
      </div>
      <div class="card">
        <div v-if="is_root == false"> 
          <h2 class="card-title">By {{ comment_tree.comment.owner_instance.username }} at {{ comment_tree.comment.time }}</h2>
          <div v-if="comment_tree.comment.owner_instance.pk == _user.pk">
            <el-button @click="deleteComment(comment_tree.comment)">Delete</el-button>
          </div>
          <p class="content" v-html='comment_tree.comment.html_content' v-highlight></p>
          <div v-if="comment_tree.comment.status == false">
            <el-button @click="replyTo(comment_tree.comment)">Reply To</el-button>
          </div>
          <div v-else>
            <mavon-editor :ishljs = "true" :preview="true" v-model="comment_content"  placeholder="What do you want to post" />
            <el-button @click="saveComment(comment_tree.comment)">Save</el-button>
            <el-button @click="cancel(comment_tree.comment)">Cancel</el-button>
          </div>
          <div v-if="is_root == false">
            <div v-if="comment_tree.sub_comment_ids.length != 0">
              <el-button v-if="fold == true" @click="toggleChildren">Check out reply</el-button>
              <el-button v-if="fold == false" @click="toggleChildren">Stow reply</el-button>
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
          <el-button @click="saveComment(comment_tree.comment)">Post a comment</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment';
import renderMath from "@/assets/utils/renderMath"

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
    },
	},
	created() {
    this.comment_tree = Comment.get_matched_comment_tree(this.wrapped_tree, this.node_id)
  },
  watch: {
    wrapped_tree(val) {
      this.comment_tree = Comment.get_matched_comment_tree(val, this.node_id)
    },
    comment_tree() {
      this.$nextTick().then(() => {
        renderMath()
      })
    }
  }
}
</script>
