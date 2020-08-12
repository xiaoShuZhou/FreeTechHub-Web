import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chattingWith: '',
    user: ''
  },
  mutations: {
    chatWith(state, user_id) {
      state.chattingWith = user_id
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
