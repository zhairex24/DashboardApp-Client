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
                <tr v-for="(item, i) in orders" :key="1">
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
                            <Edit_Icon class="table-icon"  @click="openEditModal(item.id)"/>
                        </span>
                        <span>
                            <Trash_Icon class="table-icon__left" @click="openDeleteModal(item.id)"/>
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
import { defineComponent, onMounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateOrderModal from '../modals/CreateOrderModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { IOrder } from '@/models/IOrder';

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
        const ENTITY_TYPE = ref('order')
        const entityId = ref()
        const orderIdToDelete = ref('')

        const orders = ref()

        const isCreateModalVisible = ref(false);
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false)
        
        const orderIdToUpdate = ref('');
        const orderToUpdate = ref();

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
            orders.value = await loadOrders();
        }

        const updateList = async () => {
            orders.value = await loadOrders();
        }

        const handleEdit = (editedOrder: Partial<IOrder>) => {
            editOrder(orderIdToUpdate.value, editedOrder)
            .then(() => {
                closeEditModal();
                updateList();
                orderIdToUpdate.value = '';
            });
        }

        const handleDeleteOrder = () => {
            deleteOrder(orderIdToDelete.value)
            .then(() => {
                closeDeleteModal();
                updateList();
                entityId.value = ''
                orderIdToDelete.value = ''
            });
        }

        onMounted(() => {
            updateList();
            getOrders();
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