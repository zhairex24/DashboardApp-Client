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

    <create-order-modal v-if="isCreateModalVisible" @close-modal="closeCreateModal" @update-list="updateList"></create-order-modal>
    <edit-order-modal v-if="isEditModalVisible" @close-modal="closeEditModal" :order="orderToUpdate" @handle-edit="handleEdit"></edit-order-modal>
    <confirm-delete-modal v-if="isDeleteModalVisible" @close-modal="closeDeleteModal" @handle-delete-product="handleDeleteOrder" :entity-type="ENTITY_TYPE" :entity-id="entityId"></confirm-delete-modal>
    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Order Date</th>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Shipped Name</th>
                    <th>Shipped Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in orders" :key="1" @click="openOrderDetails(item)">
                    <td>{{ i+1 }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ utils.formatDate(item.order_date) }}</td>
                    <td>{{ item.customer.first_name }} {{ item.customer.last_name }}</td>
                    <td>{{ item.product.product_name }}</td>
                    <td>{{ item.shipped_name }}</td>
                    <td>
                        {{ item.shipped_barangay }}, {{ item.shipped_city }}, {{ item.shipped_province }}
                        {{ item.shipped_country }} {{ item.shipped_postal_code }}
                    </td>
                    <td>
                        <span>
                            <Edit_Icon class="table-icon" @click.stop @click="openEditModal(item.id)"/>
                        </span>
                        <span>
                            <Trash_Icon class="table-icon__left" @click.stop @click="openDeleteModal(item.id)"/>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">

import utils from '@/composables/utils';
import { loadOrders, editOrder, deleteOrder } from '@/api/reporting/order';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateOrderModal from '../modals/CreateOrderModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { IOrder } from '@/models/IOrder';

import { useStore } from 'vuex';
import router from '@/router';



export default defineComponent ({
    
    components: {
        Edit_Icon,
        Trash_Icon,
        Plus_Icon,
        CreateOrderModal,
        EditOrderModal,
        ConfirmDeleteModal
    },

    setup() {
        const store = useStore()

        const ENTITY_TYPE = ref('order')
        const entityId = ref()
        const orderIdToDelete = ref('')

        const orders = computed(() => {
            let data = store.getters['orderManagement/getOrders']
            if(!data) return
            return data
        })

        const isCreateModalVisible = ref(false);
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false)
        
        const orderIdToUpdate = ref('');
        const orderToUpdate = ref();

        const openOrderDetails = (item: IOrder) => {
            let id = item.id

            setDataForOrderDetails(item)

            router.push({
                name: 'order-details',
                params: {
                    id
                }
            })
        }

        const setDataForOrderDetails = (item: IOrder) => {
            return store.dispatch('orderManagement/setOrderDetails', {
                ...item
            })
        }

        const openCreateModal = () => {
            isCreateModalVisible.value = true;
        }

        const closeCreateModal = () => {
            isCreateModalVisible.value = false;
        }
        
        const openEditModal = (id: string) => {
            orderIdToUpdate.value = id;
            orderToUpdate.value = toRaw(orders.value).find((x: any) => x.id === id);
            isEditModalVisible.value = true;
        }

        const closeEditModal = () => {
            isEditModalVisible.value = false;
        }

        const openDeleteModal = (id: string) => {
            entityId.value = id
            orderIdToDelete.value = id
            isDeleteModalVisible.value = true;
        }
        const closeDeleteModal = () => {
            isDeleteModalVisible.value = false;
        }

        const getOrders = async () => {
            // orders.value = await loadOrders();
        }

        const updateList = async () => {
            // orders.value = await loadOrders();
            return Promise.allSettled([
                store.dispatch('orderManagement/setOrders', {})
            ])
        }

        const handleEdit = (editedOrder: any) => {
            let id = orderIdToUpdate.value

            editOrder(orderIdToUpdate.value, editedOrder)
            .then(() => {
                closeEditModal();
                orderIdToUpdate.value = '';
                store.dispatch('orderManagement/updateOrder', {editedOrder, id})
            });
        }

        const handleDeleteOrder = () => {
            closeDeleteModal()
            deleteOrder(orderIdToDelete.value)
            .then(() => {
                // updateList(); 
                let id = orderIdToDelete.value
                store.dispatch('orderManagement/deleteOrder', id)
                entityId.value = ''
                orderIdToDelete.value = ''
            })
            .catch((error) => {
                console.log('error in deleting order', error)
            })
        }

        onMounted(() => {
            if(!orders.value) updateList() // not call the
        }) 

        return {
            ENTITY_TYPE,
            entityId,
            isCreateModalVisible,
            isEditModalVisible,
            isDeleteModalVisible,
            orders,
            orderIdToUpdate,
            orderToUpdate,

            
            utils,
            handleEdit,
            handleDeleteOrder,
            openOrderDetails,
            openCreateModal,
            closeCreateModal,
            openEditModal,
            closeEditModal,
            openDeleteModal,
            closeDeleteModal,
            updateList
        }
    }

})
</script>
<style lang="">
    
</style>