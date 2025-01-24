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

    <div class="filters">
        <div class="filter-wrapper">
            <p>Search:</p>
            <input type="text" v-model="search" placeholder="product or category or supplier" @keyup.enter="filterList">
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

    <create-product-modal v-if="isCreateModalVisible" @close-modal="closeCreateProductModal" @update-list="updateList"></create-product-modal>
    <edit-product-modal v-if="isEditModalVisible" @close-modal="closeEditProductModal" :product="productToUpdate" @handle-edit-product="handleEditProduct"></edit-product-modal>
    <confirm-delete-modal v-if="isDeleteModalVisible" @close-modal="closeDeleteModal" @handle-delete-product="handleDeleteProduct" :entity-type="ENTITY_TYPE" :entity-id="entityId"></confirm-delete-modal>

    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>#</th>
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
                <tr v-for="(item, i) in products" :key="1" @click="openProductDetails(item)">
                    <td>{{ i+1 }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.category.name }} -- {{ item.category.id }}</td>
                    <td>{{ item.supplier.company_name }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.units_in_stock }}</td>
                    <td>{{ item.units_on_order }}</td>
                    <td>
                        <span>
                            <Edit_Icon class="table-icon" @click.stop @click="openEditProductModal(item.id)"/>
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
import { loadProducts, editProduct, deleteProduct } from '@/api/reporting/products';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateProductModal from '../modals/CreateProductModal.vue';
import EditProductModal from '../modals/EditProductModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import Pagination from '@/components/common/Pagination.vue';
import { IProduct } from '@/models/IProduct';

import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent ({
    components: {
        ConfirmDeleteModal,
        CreateProductModal,
        Edit_Icon,
        EditProductModal,
        Pagination,
        Plus_Icon,
        Trash_Icon,
    },

    setup() {
        const store = useStore()

        const ENTITY_TYPE = ref('product')
        const entityId = ref()
        const productIdToDelete = ref('')

        const products = computed(() => {
            let data = store.getters['productManagement/getProducts']
            if(!data) return
            return data
        })

        const search = ref()

        const isCreateModalVisible = ref(false)
        const isEditModalVisible = ref(false)
        const isDeleteModalVisible = ref(false)

        const productIdToUpdate = ref('');
        const productToUpdate = ref();

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

        const openProductDetails = (item: IProduct) => {
            let id = item.id

            setDataForProductDetails(item)

            router.push({
                name: 'product-details',
                params: {
                    id
                }
            })
        }

        const setDataForProductDetails = (item: IProduct) => {
            return store.dispatch('productManagement/setProductDetails', {
                ...item
            })
        }

        const openCreateProductModal = () => {
            isCreateModalVisible.value = true;
        }
        const closeCreateProductModal = () => {
            isCreateModalVisible.value = false;
        }
        
        const openEditProductModal = (id: string) => {
            productIdToUpdate.value = id;
            productToUpdate.value = toRaw(products.value).find((x: any) => x.id === id);
            isEditModalVisible.value = true;
        }
        const closeEditProductModal = () => {
            isEditModalVisible.value = false;
        }
        
        const openDeleteModal = (id: string) => {
            entityId.value = id
            productIdToDelete.value = id
            isDeleteModalVisible.value = true;
        }
        const closeDeleteModal = () => {
            isDeleteModalVisible.value = false;
        }

        const getProducts = async () => {
            // products.value = await loadProducts();
            return Promise.allSettled([
                store.dispatch('productManagement/setProducts', {})
            ])
        }

        const filterList = () => {
            currentPage.value = 1
            updateList()
        }
        
        const refreshList = () => {
            window.location.reload()
        }

        const updateList = async () => {
            // products.value = await loadProducts();
            // return Promise.allSettled([
            //     store.dispatch('productManagement/setProducts', {
            //         search: search.value,
            //     })
            // ])

            let data: any = await Promise.allSettled([
                store.dispatch('productManagement/setProducts', {
                    search: search.value,
                    per_page: perPage.value,
                    page: currentPage.value,
                })
            ])

            let paginationInfo = data[0].value
            store.dispatch('paginationManagement/setNumberOfPages', paginationInfo.number_of_pages)
            store.dispatch('paginationManagement/setCount', paginationInfo.count)

            return data
        }

        const handleEditProduct = (editedProduct: any) => {
            let id = productIdToUpdate.value

            editProduct(productIdToUpdate.value, editedProduct)
            .then(() => {
                closeEditProductModal();
                // updateList();
                // getProducts()
                productIdToUpdate.value = '';
                productToUpdate.value = ref();
                store.dispatch('productManagement/updateProduct', {editedProduct, id})
            });
        }
        
        const handleDeleteProduct = () => {
            closeDeleteModal()
            deleteProduct(productIdToDelete.value)
            .then(() => {
                let id = productIdToDelete.value
                store.dispatch('productManagement/deleteProduct', id)
                entityId.value = ''
                productIdToDelete.value = ''
            })
            .catch((error) => {
                console.log('error in deleting product', error)
            })
        }

        onMounted(() => {
            console.log('count', count.value)
            if(!products.value) updateList() // not call the
        })

        return {
            ENTITY_TYPE,
            entityId,

            count,
            currentPage,
            isCreateModalVisible,
            isEditModalVisible,
            isDeleteModalVisible,
            numberOfPages,
            perPage,
            products,
            productIdToUpdate,
            productToUpdate,
            search,

            closeCreateProductModal,
            closeEditProductModal,
            closeDeleteModal,
            filterList,
            handleEditProduct,
            handleDeleteProduct,
            openProductDetails,
            openCreateProductModal,
            openEditProductModal,
            openDeleteModal,
            refreshList,
            updateList,
            updatePage,
            updateTableSize,
        }
    }  
})
</script>
<style lang="">
    
</style>