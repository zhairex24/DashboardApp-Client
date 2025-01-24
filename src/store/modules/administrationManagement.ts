import { getUsers, addUser, deleteUser, unblockUser, updateUserPassword, getUser, updateOwnProfile } from "@/api/admin/admin";

import { IUser } from "@/models/IUser";

import { Commit } from "vuex";

import { GlobalState } from "../types";

export default {
    namespaced: true,
    state: {
        users: []
    },

    mutations: {
        SET_USERS(state: GlobalState, context: IUser[]) {
            state.users = context;
        },
        
        SET_USER(state: GlobalState, context: IUser) {
            state.user = context;
        },

        ADD_USER(state: GlobalState, user: IUser) {
            user.is_blocked = false
            user.is_active = true
            user.password = ''
            state.users.push(user)
        },

        DELETE_USER(state: GlobalState, id: string) {
            state.users = state.users.filter((user) => {
                return user.id != Number(id)
            })
        },
        
        UNBLOCK_USER(state: GlobalState, selectedUsername: string) {
            state.users[
                state.users.findIndex((user) => user.username === selectedUsername)
            ].is_blocked = false
        },
        
        UPDATE_USER_PASSWORD(state: GlobalState, context: any) {
            state.passwordUpdate = context
        },
        
        UPDATE_OWN_PROFILE(state: GlobalState, payload: any) {
            state.user.username = payload.username
            state.user.email = payload.email
            state.user.first_name = payload.first_name
            state.user.last_name = payload.last_name
        },
    },

    actions: {
        setUsers({commit} : {commit: Commit}) {
            getUsers()
            .then((data) => {
                commit('SET_USERS', data)
            })
            .catch(() => {
                return false;
            })
        },
        // async setUsers({commit}: {commit: Commit}) {
        //     let data: any = await getUsers()

        //     commit('SET_EYY', data)

        //     return data
        // },
        
        setUser({commit} : {commit: Commit}, userId: string) {
            getUser(userId)
            .then((data) => {
                commit('SET_USER', data)
            })
            .catch(() => {
                return false;
            })
        },


        addUser({ commit }: any, user: Partial<IUser>) {
            return addUser(user)
                .then(() => {
                    commit("ADD_USER", user)
                    return true
                })
                .catch(() => {
                    return false
                })
        },
        
        deleteUser({ commit }: any, payload: Partial<IUser>) {
            return deleteUser(String(payload.id))
                .then(() => {
                    commit("DELETE_USER", payload.id)
                    return true
                })
                .catch(() => {
                    return false
                })
        },

        async unblockUser({ commit }: { commit: Commit }, payload: string) {
            return unblockUser(payload)
            .then(() => {
                commit("UNBLOCK_USER", payload)
                return true
            })
            .catch((e: any) => {
                console.log("is returning false", e)
                return false
            })
               
        },

        updateUserPassword({ commit }: any, payload: any) {
            return updateUserPassword(payload)
                .then(() => {
                    commit("UPDATE_USER_PASSWORD", payload)
                    return true
                })
                .catch(() => {
                    return false
                })
        },
        
        updateOwnProfile({ commit }: any, payload: any) {
            return updateOwnProfile(payload)
                .then(() => {
                    commit("UPDATE_OWN_PROFILE", payload)
                    return true
                })
                .catch((e: any) => {
                    console.log('update own profile error', e)
                    return false
                })
        },

    },

    getters: {
        getUsers(state: GlobalState) {
            return state.users;
        },
        getUser(state: GlobalState) {
            return state.user;
        },

    }

}