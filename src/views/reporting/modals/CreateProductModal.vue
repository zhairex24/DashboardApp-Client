<template @close="closeModal">
    <modal>
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">New Product</span>
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

            <select v-model="categoryId">
                <option value="" disabled selected>Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }} ({{ category.description }})
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

            <select v-model="supplierId">
                <option value="" disabled selected>Select Supplier</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
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
                    <button :disabled="!buttonEnable" class="confirm" @click="addNewProduct()">Confirm</button>
                </div>
            </div>
        </div>
    </modal>
</template>
<script lang="ts">
import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { defineComponent, onBeforeMount, ref, watch } from 'vue';

import { IProduct } from '@/models/IProduct';

import { saveNewProduct } from '@/api/reporting/product';
import { loadCategories } from '@/api/common/categories';
import { loadSuppliers } from '@/api/reporting/supplier';

export default defineComponent ({
    components: {
        Close_Icon,
        Modal
    },

    emits: ['close-modal', 'update-list'],

    setup(_, context) {
        const buttonEnable = ref(false)

        const productName = ref('')
        const categoryId = ref('')
        const supplierId = ref('')
        const unitPrice = ref()
        const unitsInStock = ref()
        const unitsOnOrder = ref()

        const categories = ref()
        const suppliers = ref()

        watch(() => [productName.value, categoryId.value, supplierId.value,
                    unitPrice.value, unitsInStock.value, unitsOnOrder.value],
                    () => {
                        if(
                            productName.value === '' ||
                            categoryId.value === '' ||
                            supplierId.value === '' ||
                            unitPrice.value === undefined ||
                            unitsInStock.value === undefined ||
                            unitsOnOrder.value === undefined
                        ) {
                            buttonEnable.value = false
                        } else {
                            buttonEnable.value = true
                        }
                    }
        
    )
        
        const getCategories = async () => {
            categories.value = await loadCategories();
            console.log(' download categories ==>')
        }

        const getSuppliers = async () => {
            suppliers.value = await loadSuppliers();
            console.log(' download suppliers')
        }

        const addNewProduct = () => {
            let newProductRecord: Partial<IProduct> = {}
                newProductRecord.productName = productName.value;
                newProductRecord.categoryId = categoryId.value;
                newProductRecord.supplierId = supplierId.value;
                newProductRecord.unitPrice = unitPrice.value;
                newProductRecord.unitsInStock = unitsInStock.value;
                newProductRecord.unitsOnOrder = unitsOnOrder.value;

                saveNewProduct(newProductRecord).then(() => {
                    updateList();
                    closeModal();
                });
        }

        const closeModal = () => {
            context.emit('close-modal')
        }
        
        const updateList = () => {
            context.emit('update-list')
        }
        
        onBeforeMount(() => {
            getCategories();
            getSuppliers();
        })

        return {
            buttonEnable,

            productName,
            categoryId,
            supplierId,
            unitPrice,
            unitsInStock,
            unitsOnOrder,

            categories,
            suppliers,

            addNewProduct,
            closeModal,
            updateList
        }
    }
})
</script>
<style lang="">
    
</style>