import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    headPortrait: '',
    searchList: []
  },
  getters: {
    headPortrait (state) {
      return state.headPortrait
    },
    searchList (state) {
      return state.searchList
    }
  },
  mutations: {
    UPDATE_USER_HEAD (state, data) {
      state.headPortrait = data
    },
    GET_SEARCH_LIST (state, data) {
      state.searchList = data
    }
  },
  actions: {
    SET_USER_HEAD ({ commit }, data) {
      commit('UPDATE_USER_HEAD', data)
    },
    async GET_SEARCH_LIST ({ commit }, data) {
      const { keyword } = data
      let res = await axios.get('/api/posts/search?keyword=' + keyword)
      commit('GET_SEARCH_LIST', res.data)
    }
  }
})
