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

            <!-- <input type="text" v-model="categoryId"> -->
            <select>
                <option value="" disabled selected>Select Category</option>
            </select>

            <label>
                <strong>
                    <small>
                        Supplier
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <!-- <input type="text" v-model="supplierId"> -->
            <select>
                <option value="" disabled selected>Select Supplier</option>
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
                    <button class="confirm" @click="addNewProduct()">Confirm</button>
                </div>
            </div>
        </div>
    </modal>
</template>
<script lang="ts">
import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent ({
    components: {
        Close_Icon,
        Modal
    },

    emits: ['close-modal'],

    setup(_, context) {
        const buttonEnable = ref(false)

        const productName = ref('')
        const categoryId = ref('')
        const supplierId = ref('')
        const unitPrice = ref()
        const unitsInStock = ref()
        const unitsOnOrder = ref()
        
        const addNewProduct = () => {
            closeModal()
        }

        const closeModal = () => {
            context.emit('close-modal')
        }
        
        return {
            productName,
            categoryId,
            supplierId,
            unitPrice,
            unitsInStock,
            unitsOnOrder,

            addNewProduct,
            closeModal
        }
    }
})
</script>
<style lang="">
    
</style>