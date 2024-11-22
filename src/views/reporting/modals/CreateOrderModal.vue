<template @close="closeModal">
    <modal>
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Order properties</span>
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>
        
            <label>
                <strong>
                    <small>
                        Product
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select>
                <option value="" disabled selected>Select Product</option>
            </select>
            
            <label>
                <strong>
                    <small>
                        Customer
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select>
                <option value="" disabled selected>Select Customer</option>
            </select>

            <label>
                <strong>
                    <small>
                        Order Date
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="date">
            
            <label>
                <strong>
                    <small>
                        Shipped Name
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedName">
            
            <label>
                <strong>
                    <small>
                        Shipped Barangay
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedBarangay">

            <label>
                <strong>
                    <small>
                        Shipped City
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedCity">
            
            <label>
                <strong>
                    <small>
                        Shipped Province
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedProvince">
            
            <label>
                <strong>
                    <small>
                        Shipped Country
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedCountry">

            <label>
                <strong>
                    <small>
                        Shipped Postal Code
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="shippedPostalCode">

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">Cancel</button>
                    <button class="confirm" @click="addNewRecord()">Confirm</button>
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

        const productId = ref(false)
        const customerId = ref(false)
        const orderDate = ref(false)
        const shippedName = ref(false)
        const shippedBarangay = ref(false)
        const shippedCity = ref(false)
        const shippedProvince = ref(false)
        const shippedCountry = ref(false)
        const shippedPostalCode = ref(false)
        
        const addNewRecord = () => {
            closeModal()
        }

        const closeModal = () => {
            context.emit('close-modal')
        }
        
        return {
            productId,
            customerId,
            orderDate,
            shippedName,
            shippedBarangay,
            shippedCity,
            shippedProvince,
            shippedCountry,
            shippedPostalCode,

            addNewRecord,
            closeModal
        }
    }
})
</script>
<style lang="">
    
</style>