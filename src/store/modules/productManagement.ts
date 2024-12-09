import { GlobalState } from "../types";
import { Commit } from "vuex";
import { loadProducts } from "@/api/reporting/products";
import { IProduct } from "@/models/IProduct";

export default {
    namespaced: true,

    mutations: {
        SET_PRODUCTS(state: GlobalState, context: any) {
            state.products = context
        },

        SET_PRODUCT_DETAILS(state: GlobalState, context: IProduct) {
            state.productDetails = context
        },

        DELETE_PRODUCT(state: GlobalState, context: string) {
            state.products = state.products.filter(x => x.id !== context)
        },
        
        UPDATE_PRODUCT(state: GlobalState, context: any) {
            let index = state.products.findIndex(x => x.id === context.id)

            state.products[index] = {...state.products[index],
                product_name: context.editedProduct.productName, 
                unit_price: context.editedProduct.unitPrice, 
                units_in_stock: context.editedProduct.unitsInStock, 
                units_on_order: context.editedProduct.unitsOnOrder, 
                category: context.editedProduct.category,
                supplier: context.editedProduct.supplier,
            }
        },
        
        POST_PRODUCT(state: GlobalState, context: any) {
            state.products.unshift(context.responseObject)
        },

        SET_COUNT(state: GlobalState, context: any) {
            state.count = context
        },

        SET_NUMBER_OF_PAGES(state: GlobalState, context: any) {
            state.numberOfPages = context
        },
    },

    actions: {
        async setProducts({commit}: {commit: Commit}, payload: any) {
            let data: any = await loadProducts(
                payload.search,
                payload.page,
                payload.per_page,
            )

            commit('SET_PRODUCTS', data.results)
            commit('SET_COUNT', data.count)
            commit('SET_NUMBER_OF_PAGES', data.number_of_pages)

            return data
        },

        async setProductDetails({commit}: {commit: Commit}, payload: IProduct) {
            commit('SET_PRODUCT_DETAILS', payload)
        },

        async deleteProduct({commit}: {commit: Commit}, payload: string) {
            commit('DELETE_PRODUCT', payload)
        },

        async updateProduct({commit}: {commit: Commit}, payload: any) {
            commit('UPDATE_PRODUCT', payload)
        },
        
        async postProduct({commit}: {commit: Commit}, payload: any) {
            commit('POST_PRODUCT', payload)
        },

        async setNumberOfPages({commit}: {commit: Commit}, payload: any) {
            commit('SET_NUMBER_OF_PAGES', payload)
        },
    },

    getters: {
        getProducts(state: GlobalState) {
            return state.products
        },

        getProductDetails(state: GlobalState) {
            return state.productDetails
        },

        getNumberOfPages(state: GlobalState) {
            return state.numberOfPages
        },

        getCount(state: GlobalState) {
            return state.count
        }
    }
}