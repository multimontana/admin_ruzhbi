import axios from 'axios'

const qs = require('query-string')
export const auth = {
  state: {
    authorization: false,
    login: false,
    user: {},
    token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
  },
  mutations: {
    SET_AUTH_TOKEN (state, payload) {
      state.token = payload
    }
  },
  actions: {
      async loginUserAction (context, data) {
          try {
              const response = await axios.post('/auth', data)
              if (response.data.success) {
                  context.commit('SET_AUTH_TOKEN', response.data)
                  const token = response.data.token
                  const type = '_token'
                  const date = new Date()
                  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
                  const expires = date.toUTCString()
                  document.cookie = `${type} = ${token}; expires = ${expires}; path=/`
                  return true
              }
              return  false
          } catch (e) {
              console.log(e)
          }
      }
  },
  getters: {
    getUser: state => state.user
  }
}
