import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //data
  state: {
    chattingWith: '',
    user: '',
    root_comment_tree:'',
    root_id:'',
  },
//methods
  mutations: {
    chatWith(state, user) {
      state.chattingWith = user
    },
    setUser(state, user) {
      state.user = user
    },
    set_root_comment_tree(state, dict_tree){
      state.root_comment_tree = dict_tree
    },
    set_root_id(state, id){
      state.root_id = id
    }
  },
//async methods
  actions: {

  },
  modules: {
  }
})
