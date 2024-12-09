import { GlobalState } from "../types";
import { Commit } from "vuex";

export default {
    namespaced: true,

    mutations: {
        SET_COUNT(state: GlobalState, context: any) {
            state.count = context
        },

        SET_NUMBER_OF_PAGES(state: GlobalState, context: any) {
            state.numberOfPages = context
        },
        
        RESET_VALUES(state: GlobalState) {
            state.count = 0
            state.numberOfPages = 0
        },
    },

    actions: {
        async setNumberOfPages({commit}: {commit: Commit}, payload: any) {
            commit('SET_NUMBER_OF_PAGES', payload)
        },
        
        async setCount({commit}: {commit: Commit}, payload: any) {
            commit('SET_COUNT', payload)
        },
        
        async resetValues({commit}: {commit: Commit}) {
            commit('RESET_VALUES')
        },
    },

    getters: {
        getNumberOfPages(state: GlobalState) {
            return state.numberOfPages
        },

        getCount(state: GlobalState) {
            return state.count
        }
    }
}