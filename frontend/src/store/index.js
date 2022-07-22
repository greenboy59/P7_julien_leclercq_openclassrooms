import { createStore } from 'vuex'
import { isAdmin } from '@/helpers/utils'
import router from '@/router'
import axios from 'axios'

export default createStore({
  state: {
    user: null
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user
    },

    isAdmin (state) {
      if (state.user?.token) {
        return isAdmin(state.user.token)
      }
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async login ({ commit }, { email, password }) {
      const { data } = await axios.post('/auth/login', { email, password })
      localStorage.setItem('user', JSON.stringify(data))
      commit('setUser', data)
    },

    async logout ({ commit }) {
      localStorage.removeItem('user')
      commit('setUser', null)
      await router.replace('/login')
    },

    async signup ({ commit }, payload) {
      const { data } = await axios.post('/auth/login', payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      localStorage.setItem('user', JSON.stringify(data))
      commit('setUser', data)
    },

    getUser ({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'))
      commit('setUser', user)
    }
  },
  modules: {}
})
