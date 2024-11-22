<template>
    <header>
        <span class="title">
            Reporting / Products
        </span>
        <button class="button is-primary is-on-header" @click="openCreateProductModal">
            <span>
                <Plus_Icon class="nav_icon"/>
            </span>
            New Product
        </button>
    </header>

    <create-product-modal v-if="isCreatedModalVisible" @close-modal="closeCreateProductModal"></create-product-modal>

    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Supplier Name</th>
                    <th>Unit Price</th>
                    <th>Unit in stock</th>
                    <th>Unit on order</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in products" :key="1">
                    <td>{{ item.id }}</td>
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>{{ item.supplier.company_name }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.units_in_stock }}</td>
                    <td>{{ item.units_on_order }}</td>
                    <td>
                        <span>
                            <Edit_Icon class="table-icon"/>
                        </span>
                        <span>
                            <Trash_Icon class="table-icon__left "/>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { loadProducts } from '@/api/reporting';
import { defineComponent, onMounted, ref } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateProductModal from '../modals/CreateProductModal.vue';

export default defineComponent ({
    components: {
        Edit_Icon,
        Trash_Icon,
        Plus_Icon,
        CreateProductModal
    },

    setup() {
        const products = ref()

        const isCreatedModalVisible = ref(false)
        const openCreateProductModal = () => {
            isCreatedModalVisible.value = true;
        }
        const closeCreateProductModal = () => {
            isCreatedModalVisible.value = false;
        }

        const getProducts = async () => {
            products.value = await loadProducts()
        }

        onMounted(() => {
            getProducts()
        })

        return {
            products,
            isCreatedModalVisible,

            openCreateProductModal,
            closeCreateProductModal
        }
    }  
})
</script>
<style lang="">
    
</style>