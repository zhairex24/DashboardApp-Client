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
    </div>
</template>
<script lang="ts">
import { loadProducts, editProduct, deleteProduct } from '@/api/reporting/product';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateProductModal from '../modals/CreateProductModal.vue';
import EditProductModal from '../modals/EditProductModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { IProduct } from '@/models/IProduct';

import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent ({
    components: {
        Edit_Icon,
        Trash_Icon,
        Plus_Icon,
        CreateProductModal,
        EditProductModal,
        ConfirmDeleteModal
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

        const isCreateModalVisible = ref(false)
        const isEditModalVisible = ref(false)
        const isDeleteModalVisible = ref(false)

        const productIdToUpdate = ref('');
        const productToUpdate = ref();

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

        const updateList = async () => {
            // products.value = await loadProducts();
            return Promise.allSettled([
                store.dispatch('productManagement/setProducts', {})
            ])
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
            if(!products.value) updateList() // not call the
        })

        return {
            ENTITY_TYPE,
            entityId,
            isCreateModalVisible,
            isEditModalVisible,
            isDeleteModalVisible,
            products,
            productIdToUpdate,
            productToUpdate,

            handleEditProduct,
            handleDeleteProduct,
            openProductDetails,
            openCreateProductModal,
            closeCreateProductModal,
            openEditProductModal,
            closeEditProductModal,
            openDeleteModal,
            closeDeleteModal,
            updateList
        }
    }  
})
</script>
<style lang="">
    
</style>