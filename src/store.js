import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    headPortrait: ''
  },
  getters: {
    headPortrait (state) {
      return state.headPortrait
    }
  },
  mutations: {
    UPDATE_USER_HEAD (state, data) {
      state.headPortrait = data
    }
  },
  actions: {
    SET_USER_HEAD ({ commit }, data) {
      commit('UPDATE_USER_HEAD', data)
    }
  }
})
