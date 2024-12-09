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

    <div class="filters">
        <div class="filter-wrapper">
            <p>Shipped Country:</p>
            <select v-model="filteredCountry">
                <option value="" disabled selected>All Countries</option>
                <option v-for="(country, i) in countries" :key="1" :value="country">
                    {{ country }}
                </option>
            </select>
        </div>
        <div class="filter-wrapper">
            <p>Shipped City:</p>
            <select v-model="filteredCity">
                <option value="" disabled selected>All Cities</option>
                <option v-for="(city, i) in cities" :key="1" :value="city">
                    {{ city }}
                </option>
            </select>
        </div>
        <div class="filter-wrapper">
            <p>Search:</p>
            <input type="text" v-model="search" placeholder="product or customer" @keyup.enter="filterList">
        </div>
        <div class="filter-wrapper">
            <p>Filter:</p>
            <button id="filter" class="filters_button" @click="filterList">Filter</button>
        </div>
        <div class="filter-wrapper">
            <p>Refresh:</p>
            <button id="refresh" class="filters_button" @click="refreshList">Refresh</button>
        </div>
    </div>

    <create-order-modal v-if="isCreateModalVisible" @close-modal="closeCreateModal" @update-list="updateList"></create-order-modal>
    <edit-order-modal v-if="isEditModalVisible" @close-modal="closeEditModal" :order="orderToUpdate" @handle-edit="handleEdit"></edit-order-modal>
    <confirm-delete-modal v-if="isDeleteModalVisible" @close-modal="closeDeleteModal" @handle-delete-product="handleDeleteOrder" :entity-type="ENTITY_TYPE" :entity-id="entityId"></confirm-delete-modal>
    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th @click="setSortingBy(ORDER_BY_ID)">ID <Sorting_Icon :class="orderBy === ORDER_BY_ID ? 'active-sorting' : ''" class="sorting-icon"/></th>
                    <th @click="setSortingBy(ORDER_BY_DATE)">Order Date <Sorting_Icon :class="orderBy === ORDER_BY_DATE ? 'active-sorting' : ''" class="sorting-icon"/></th>
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
        <pagination v-if="count > 0" :current-page="currentPage" :per-page="perPage" :number-of-pages="numberOfPages" :count="count"
            @update-page="updatePage" @update-table-size="updateTableSize">
        </pagination>
    </div>
</template>
<script lang="ts">

import utils from '@/composables/utils';
import { loadOrders, editOrder, deleteOrder } from '@/api/reporting/orders';
import { computed, defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';

import CreateOrderModal from '../modals/CreateOrderModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import Pagination from '@/components/common/Pagination.vue';
import { IOrder } from '@/models/IOrder';

import { useStore } from 'vuex';
import router from '@/router';
import { loadCountries } from '@/api/common/countries';
import { loadCities } from '@/api/common/cities';



export default defineComponent ({
    
    components: {
        CreateOrderModal,
        ConfirmDeleteModal,
        Edit_Icon,
        EditOrderModal,
        Pagination,
        Plus_Icon,
        Sorting_Icon,
        Trash_Icon,
    },

    setup() {
        const ORDER_BY_ID = 'id'
        const ORDER_BY_DATE = 'order_date'


        const store = useStore()

        const ENTITY_TYPE = ref('order')
        const entityId = ref()
        const orderIdToDelete = ref('')

        const orders = computed(() => {
            let data = store.getters['orderManagement/getOrders']
            if(!data) return
            return data
        })

        const search = ref()
        const countries = ref()
        const filteredCountry = ref()
        const cities = ref()
        const filteredCity = ref()

        const isCreateModalVisible = ref(false);
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false)
        
        const orderIdToUpdate = ref('');
        const orderToUpdate = ref();

        const orderBy = ref('id')


        const currentPage = ref(1)
        const perPage = ref(5)

        const numberOfPages = computed(() => {
            const data = store.getters['paginationManagement/getNumberOfPages']
            return Number(data)
        })

        const count = computed(() => {
            const data = store.getters['paginationManagement/getCount']
            return Number(data)
        })

        const updatePage = (page: any) => {
            currentPage.value = page
            updateList()
        }

        const updateTableSize = (pageSize: any) => {
            perPage.value = pageSize.value
            currentPage.value = 1
            updateList()
        }

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

        const setSortingBy = (ordering: string) => {
            orderBy.value = ordering
            updateList()
        }

        const filterList = () => {
            currentPage.value = 1
            updateList()
        }
        
        const refreshList = () => {
            // filteredCity.value = ''
            // filteredCountry.value = ''
            // search.value = ''
            // updateList()
            window.location.reload()

        }

        const getCountries = async () => {
            let data: any = await loadCountries()
            countries.value = utils.extractValues(data)
        }
        
        const getCities = async () => {
            let data: any = await loadCities()
            cities.value = utils.extractValues(data)
        }

        const updateList = async () => {
            // orders.value = await loadOrders();
            // return Promise.allSettled([
            //     store.dispatch('orderManagement/setOrders', {
            //         filteredCountry: filteredCountry.value,
            //         filteredCity: filteredCity.value,
            //         search: search.value,
            //         per_page: perPage.value,
            //         page: currentPage.value,
            //         order_by: orderBy.value,
            //     })
            // ])

            let data: any = await Promise.allSettled([
                store.dispatch('orderManagement/setOrders', {
                    filteredCountry: filteredCountry.value,
                    filteredCity: filteredCity.value,
                    search: search.value,
                    per_page: perPage.value,
                    page: currentPage.value,
                    order_by: orderBy.value,
                })
            ])

            let paginationInfo = data[0].value
            store.dispatch('paginationManagement/setNumberOfPages', paginationInfo.number_of_pages)
            store.dispatch('paginationManagement/setCount', paginationInfo.count)

            return data
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
            getCountries()
            getCities()
        })

        onUnmounted(() => {
            store.dispatch('paginationManagement/resetValues')
        })

        return {
            ENTITY_TYPE,
            ORDER_BY_ID,
            ORDER_BY_DATE,

            cities,
            countries,
            entityId,
            filteredCity,
            filteredCountry,
            isCreateModalVisible,
            isEditModalVisible,
            isDeleteModalVisible,
            orderBy,
            orders,
            orderIdToUpdate,
            orderToUpdate,
            search,
            currentPage,
            count,
            numberOfPages,
            perPage,

            
            utils,
            closeCreateModal,
            closeEditModal,
            closeDeleteModal,
            filterList,
            handleEdit,
            handleDeleteOrder,
            openOrderDetails,
            openCreateModal,
            openEditModal,
            openDeleteModal,
            refreshList,
            setSortingBy,
            updateList,
            updatePage,
            updateTableSize,
        }
    }

})
</script>
<style lang="scss">

</style>