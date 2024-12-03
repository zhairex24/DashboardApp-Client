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
                    <td>{{ item.category.name }} -- {{ item.category.id }}</td>
                    <td>{{ item.supplier.company_name }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.units_in_stock }}</td>
                    <td>{{ item.units_on_order }}</td>
                    <td>
                        <span>
                            <Edit_Icon class="table-icon" @click="openEditProductModal(item.id)"/>
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
import { loadProducts, editProduct, deleteProduct } from '@/api/reporting/product';
import { defineComponent, onMounted, ref, toRaw } from 'vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import CreateProductModal from '../modals/CreateProductModal.vue';
import EditProductModal from '../modals/EditProductModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { IProduct } from '@/models/IProduct';

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
        const ENTITY_TYPE = ref('product')
        const entityId = ref()
        const productIdToDelete = ref('')

        const products = ref()

        const isCreateModalVisible = ref(false)
        const isEditModalVisible = ref(false)
        const isDeleteModalVisible = ref(false)

        const productIdToUpdate = ref('');
        const productToUpdate = ref();

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
            products.value = await loadProducts();
        }

        const updateList = async () => {
            products.value = await loadProducts();
        }

        const handleEditProduct = (editedProduct: Partial<IProduct>) => {
            editProduct(productIdToUpdate.value, editedProduct)
            .then(() => {
                closeEditProductModal();
                updateList();
                productIdToUpdate.value = '';
                productToUpdate.value = ref();
            });
        }
        
        const handleDeleteProduct = () => {
            deleteProduct(productIdToDelete.value)
            .then(() => {
                closeDeleteModal();
                updateList();
                entityId.value = ''
                productIdToDelete.value = ''
            });
        }

        onMounted(() => {
            getProducts();
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