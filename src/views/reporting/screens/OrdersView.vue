<template>
    <header>
        <span class="title">
            Reporting / Orders
        </span>
        <button class="button is-primary is-on-header" @click="openCreateModal">
            <span>
                <Plus_Icon class="nav_icon"/>
            </span>
            New Order
        </button>
    </header>

    <create-order-modal v-if="isCreatedModalVisible" @close-modal="closeCreateModal"></create-order-modal>

    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Order Date</th>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Shipped Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in orders" :key="1">
                    <td>{{ item.id }}</td>
                    <td>{{ item.order_date }}</td>
                    <td>{{ item.customer.first_name }} {{ item.customer.last_name }}</td>
                    <td>{{ item.product.product_name }}</td>
                    <td>
                        {{ item.shipped_barangay }}, {{ item.shipped_city }}, {{ item.shipped_province }}
                        {{ item.shipped_country }} {{ item.shipped_postal_code }}
                    </td>
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

import { loadOrders } from '@/api/reporting';
import { defineComponent, onMounted, ref } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateOrderModal from '../modals/CreateOrderModal.vue';

export default defineComponent ({
    
    components: {
        Edit_Icon,
        Trash_Icon,
        Plus_Icon,
        CreateOrderModal
    },

    setup() {
        const orders = ref()

        const isCreatedModalVisible = ref(false)
        const openCreateModal = () => {
            isCreatedModalVisible.value = true;
        }
        const closeCreateModal = () => {
            isCreatedModalVisible.value = false;
        }

        const getOrders = async () => {
            orders.value = await loadOrders()
        }

        onMounted(() => {
            getOrders()
        }) 

        return {
            orders,
            isCreatedModalVisible,

            openCreateModal,
            closeCreateModal
        }
    }

})
</script>
<style lang="">
    
</style>