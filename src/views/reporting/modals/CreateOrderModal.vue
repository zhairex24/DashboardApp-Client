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

            <select v-model="productId">
                <option value="" disabled selected>Select Product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.product_name }} {{ product.id }}
                </option>
            </select>
            
            <label>
                <strong>
                    <small>
                        Customer
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select v-model="customerId">
                <option value="" disabled selected>Select Customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.first_name }} {{ customer.last_name }}
                </option>
            </select>

            <label>
                <strong>
                    <small>
                        Required Date
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="date" v-model="requiredDate">
            
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
                    <button :disabled="!buttonEnable" class="confirm" @click="addNewRecord()">Confirm</button>
                </div>
            </div>
        </div>
    </modal>
</template>
<script lang="ts">
import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { defineComponent, onBeforeMount, ref, watch } from 'vue';
import { loadCustomers } from '@/api/relations/customers';
import { loadProducts } from '@/api/common/products';
import { addNewOrder } from '@/api/reporting/orders';
import { IOrder } from '@/models/IOrder';

import { useStore } from 'vuex';

export default defineComponent ({
    components: {
        Close_Icon,
        Modal
    },

    emits: ['close-modal', 'update-list'],

    setup(_, context) {
        const store = useStore()

        const buttonEnable = ref()

        const productId = ref('')
        const customerId = ref('')
        const requiredDate = ref('')
        const shippedName = ref('')
        const shippedBarangay = ref('')
        const shippedCity = ref('')
        const shippedProvince = ref('')
        const shippedCountry = ref('')
        const shippedPostalCode = ref('')

        const customers = ref()
        const products = ref()

        watch(() => [customerId.value, productId.value, requiredDate.value, 
                    shippedName.value, shippedBarangay.value, shippedCity.value,
                    shippedProvince.value, shippedCountry.value, shippedPostalCode.value],
                    ()=> {
                        if(
                            customerId.value === '' ||
                            productId.value === '' ||
                            requiredDate.value === '' ||
                            shippedName.value === '' ||
                            shippedBarangay.value === '' ||
                            shippedCity.value === '' ||
                            shippedProvince.value === '' ||
                            shippedCountry.value === '' ||
                            shippedPostalCode.value === ''
                        ) {
                            buttonEnable.value = false
                        } else {
                            buttonEnable.value = true
                        }
                    }
        )
        
        const getCustomers = async () => {
            customers.value = await loadCustomers();
            console.log(' download customers')
        }
        
        const getProducts = async () => {
            products.value = await loadProducts();
            console.log(' download products')
        }

        const addNewRecord = () => {
            let newOrderRecord: Partial<IOrder> = {}
                newOrderRecord.customerId = customerId.value;
                newOrderRecord.productId = productId.value;
                newOrderRecord.requiredDate = requiredDate.value;
                newOrderRecord.shippedName = shippedName.value;
                newOrderRecord.shippedBarangay = shippedBarangay.value;
                newOrderRecord.shippedCity = shippedCity.value;
                newOrderRecord.shippedProvince = shippedProvince.value;
                newOrderRecord.shippedCountry = shippedCountry.value;
                newOrderRecord.shippedPostalCode = shippedPostalCode.value;

                closeModal()
                addNewOrder(newOrderRecord).then((responseObject) => {
                    // updateList();
                    store.dispatch('orderManagement/postOrder', {responseObject})
                })
                .catch((error) => {
                    console.log('error in saving new order', error)
                })
        }

        const closeModal = () => {
            context.emit('close-modal');
        }

        const updateList = () => {
            context.emit('update-list');
        }

        onBeforeMount(() => {
            getCustomers();
            getProducts();
        })
        
        return {
            buttonEnable,

            productId,
            customerId,
            requiredDate,
            shippedName,
            shippedBarangay,
            shippedCity,
            shippedProvince,
            shippedCountry,
            shippedPostalCode,

            customers,
            products,

            addNewRecord,
            closeModal,
            updateList
        }
    }
})
</script>
<style lang="">
    
</style>