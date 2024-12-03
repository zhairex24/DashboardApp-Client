<template @close="closeModal">
    <modal>
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Edit Product</span>
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>
            
            <label>
                <strong>
                    <small>
                        Product Name
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="productName">
            
            <label>
                <strong>
                    <small>
                        Category
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select v-model="categoryIdToUpdate">
                <option value="" disabled selected>Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id" :selected="categoryIdToUpdate.value === category.id">
                    {{ category.name }} ({{ category.description }}) -- {{ category.id }}
                </option>
            </select>

            <label>
                <strong>
                    <small>
                        Supplier
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select v-model="supplierIdToUpdate">
                <option value="" disabled>Select Supplier</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id" :selected="supplierIdToUpdate.value === supplier.id">
                    {{ supplier.company_name }}
                </option>
            </select>
            
            <label>
                <strong>
                    <small>
                        Unit Price
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="number" v-model="unitPrice">
            
            <label>
                <strong>
                    <small>
                        Unit In Stock
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="number" v-model="unitsInStock">

            <label>
                <strong>
                    <small>
                        Units On Order
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="number" v-model="unitsOnOrder">

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">Cancel</button>
                    <button :disabled="!buttonEnable" class="confirm" @click="handleUpdatedProduct()">Confirm</button>
                </div>
            </div>
        </div>
    </modal>
</template>
<script lang="ts">
import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { defineComponent, onBeforeMount, reactive, ref, watch } from 'vue';

import { IProduct } from '@/models/IProduct';

import { loadCategories } from '@/api/common/categories';
import { loadSuppliers } from '@/api/reporting/supplier';
import { editOrder } from '@/api/reporting/order';

export default defineComponent ({
    components: {
        Close_Icon,
        Modal
    },

    props: {
        product: {
            type: Object,
            required: true
        }
    },

    emits: ['close-modal', 'update-list', 'handle-edit-product'],

    // methods: {
    //     selectedCategory(event: any) {
    //         this.categoryId = parseInt(event.target.value)
    //         console.log("this.categoryId.value", this.categoryId)
    //     }
    // },

    setup(props, context) {
        const buttonEnable = ref(false)

        const product = ref(props.product)

        const presentCategory = reactive({ ...product.value.category})
        const presentSupplier = reactive({ ...product.value.supplier})

        const productName = ref(product.value.product_name)
        const categoryIdToUpdate = ref(presentCategory.id)
        const supplierIdToUpdate = ref(presentSupplier.id)
        const unitPrice = ref(product.value.unit_price)
        const unitsInStock = ref(product.value.units_in_stock)
        const unitsOnOrder = ref(product.value.units_on_order)

        const categories = ref()
        const suppliers = ref()

        console.log('categoryIdToUpdate', categoryIdToUpdate.value)
        console.log('supplierIdToUpdate', supplierIdToUpdate.value)

        watch(() => [productName.value, categoryIdToUpdate.value, supplierIdToUpdate.value,
                    unitPrice.value, unitsInStock.value, unitsOnOrder.value],
                    () => {
                        if(
                            (
                                productName.value !== ''
                                && categoryIdToUpdate.value !== ''
                                && supplierIdToUpdate.value !== ''
                                && unitPrice.value !== undefined
                                && unitsInStock.value !== undefined
                                && unitsOnOrder.value !== undefined
                            )
                            &&
                            (
                                productName.value !== product.value.product_name 
                                || categoryIdToUpdate.value !== product.value.category.id
                                || supplierIdToUpdate.value !== product.value.supplier.id
                                || unitPrice.value !== product.value.unit_price
                                || unitsInStock.value !== product.value.units_in_stock
                                || unitsOnOrder.value !== product.value.units_on_order
                            )

                        ) {
                            buttonEnable.value = true
                        } else {
                            console.log('selected category => ' + categoryIdToUpdate.value)
                            buttonEnable.value = false
                        }
                    }
        
        )
        
        const getCategories = async () => {
            categories.value = await loadCategories();
        }

        const getSuppliers = async () => {
            suppliers.value = await loadSuppliers();
        }

        const handleUpdatedProduct = () => {
            let editedProductRecord: Partial<IProduct> = {
                productName: productName.value,
                categoryId: categoryIdToUpdate.value,
                supplierId: supplierIdToUpdate.value,
                unitPrice: unitPrice.value === '' ? 0 : unitPrice.value,
                unitsInStock: unitsInStock.value === '' ? 0 : unitsInStock.value,
                unitsOnOrder: unitsOnOrder.value === '' ? 0 : unitsOnOrder.value

            }
            
            editProductRecord(editedProductRecord);
        }

        const closeModal = () => {
            context.emit('close-modal')
        }
        
        const updateList = () => {
            context.emit('update-list')
        }

        const editProductRecord = (editedOrder: Partial<IProduct>) => {
            context.emit('handle-edit-product', editedOrder);
        }
        
        onBeforeMount(() => {
            getCategories();
            getSuppliers();
        })

        return {
            buttonEnable,

            productName,
            categoryIdToUpdate,
            supplierIdToUpdate,
            presentSupplier,
            unitPrice,
            unitsInStock,
            unitsOnOrder,

            categories,
            suppliers,

            handleUpdatedProduct,
            closeModal,
            updateList
        }
    }
})
</script>
<style lang="">
    
</style>