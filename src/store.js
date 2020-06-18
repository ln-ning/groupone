import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        uid: sessionStorage.getItem("uid"),
    },
    mutations: {
        getuid(state, id) {
            state.uid = id
            sessionStorage.setItem("uid", id)
        }

    },
    actions: {

    }
})