import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token') ? localStorage.getItem('token'):'',
  },
  mutations: {
    setStorage(state,value){
      state.token =value;
      localStorage.setItem('token',value)
    },
    removeStorage(state){
      state.token =null;
      localStorage.removeItem('token')
    }

  },
  actions: {
  },
  modules: {
  }
})
