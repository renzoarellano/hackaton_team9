import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      auth: null,
      busqueda:null,
    }),
    mutations: {
      setAuth(state, auth) {
        state.auth = auth
      },
      setBusqueda(state, busqueda) {
        state.busqueda = busqueda
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', auth)
      },
      nuxtBusquedaInit({ commit }, { req }) {
        let busqueda = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            busqueda = JSON.parse(parsed.busqueda)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setBusqueda', busqueda)
      }
    },
    getters:{
      loggeIn(state){
        return state.auth;
      },
      busqueda(state){
        return state.busqueda;
      },
    }
  })
}

export default createStore