<template>
  <div class="answer">
    <ul>
      <li>
        <div v-if="is_accepted ==  true">
          <div class="card">
            <div class="card-img">
              <img src="@/assets/img/头像 女孩.svg" />
              <h4>{{ answer.owner_instance.username }}</h4>
            </div>
            <h2 class="card-title">{{ answer.time }}</h2>
            <p class="card-content" v-html="answer.html_content" v-highlight></p>
            <div v-if="answer.status == true">
              <h4 class="status">Accepted</h4>
            </div>
            <div v-else>
              <h4 class="status">Unaccepted</h4>
            </div>
          </div>
          <button v-if="fold == true" @click="toggleChildren(answer)">Check out reply</button>
          <button v-if="fold == false" @click="toggleChildren(answer)">Stow reply</button>
          <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''"
            :node_id="answer.root_comment"
            :root_id="answer.root_comment"
            :wrapped_tree="wrapped_tree"
            :is_root="true"
            :_fold="false"
            :_blog="false"
            :_answer="true"
            :_user="_user">
          </show-comments>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-img">
              <img src="@/assets/img/头像 女孩.svg" />
              <h4>{{ answer.owner_instance.username }}</h4>
            </div>
            <h2 class="card-title">{{ answer.time }}</h2>
            <p class="card-content" v-html="answer.html_content" v-highlight></p>
            <h4 class="status">Unaccepted</h4>
            <button @click="acceptAnswer(answer)">Accept</button>
          </div>
          <button v-if="fold == true" @click="toggleChildren(answer)">Check out reply</button>
          <button v-if="fold == false" @click="toggleChildren(answer)">Stow reply</button>
          <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''"
            :node_id="answer.root_comment"
            :root_id="answer.root_comment"
            :wrapped_tree="wrapped_tree"
            :is_root="true"
            :_fold="false"
            :_blog="false"
            :_answer="true"
            :_user="_user">
          </show-comments>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment';
import Answer from "@/assets/utils/models/Answer";
import Transaction from '@/assets/utils/models/Transaction';
import ShowComments from '@/components/ShowComments.vue';

export default {
	name:"ShowAnswers",
  props: ['_answer','question','_is_accepted','_user'],
  components: {
    ShowComments
  },
	data(){
		return {
      wrapped_tree:'',
      comment_content:'',
      answer:this._answer,
      fold: true,
      is_accepted: this._is_accepted,
		}
	},
	methods: {
    _getTransaction(){
      return new Transaction({
        user: this.question.owner,
        amount: this.question.bounty,
        transaction_type: 'B',
        description:this.question.title,
      })
    },

    acceptAnswer(answer){
      answer.status = true
      answer.update().then(() => {
        this.question.status = true
        this.question.update().then(() => {
          let transaction = this._getTransaction()
          transaction.save().then(() => { 
            Answer.get(answer.pk)
            .then(new_answer => {
              // this.answer = new_answer
              this.$emit("updatedAnswer", new_answer)
              // this.is_accepted = true
            })
          })
        })
      })
    },

    toggleChildren(answer){
      if (this.fold == true) {
        Comment.query_sub_comments(answer.root_comment)
        .then(comment_tree => {
          this.wrapped_tree = Comment.wrap_sub_comments(comment_tree)
        })
      }
      this.fold = !this.fold
    },

    updatedTree(wrapped_comment_tree){
      this.wrapped_tree = wrapped_comment_tree
    }
  },
  watch: {
    answer(val) {
      this.answer = val
    }
  }
}
</script>
