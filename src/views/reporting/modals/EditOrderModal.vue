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
                    <button :disabled="!buttonEnable" class="confirm" @click="handleUpdatedOrder()">Confirm</button>
                </div>
            </div>
        </div>
    </modal>
</template>
<script lang="ts">
import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { defineComponent, ref, watch } from 'vue';
import { IOrder } from '@/models/IOrder';

export default defineComponent ({
    components: {
        Close_Icon,
        Modal
    },

    props: {
        order: {
            type: Object,
            required: true
        }
    },

    emits: ['close-modal', 'handle-edit'],

    setup(props, context) {
        const buttonEnable = ref()

        const order = ref(props.order)
        
        const shippedName = ref(order.value.shipped_name)
        const shippedBarangay = ref(order.value.shipped_barangay)
        const shippedCity = ref(order.value.shipped_city)
        const shippedProvince = ref(order.value.shipped_province)
        const shippedCountry = ref(order.value.shipped_country)
        const shippedPostalCode = ref(order.value.shipped_postal_code)

        const customers = ref()
        const products = ref()

        watch(() => [shippedName.value, shippedBarangay.value, shippedCity.value,
                    shippedProvince.value, shippedCountry.value, shippedPostalCode.value],
                    ()=> {
                        if(
                            (
                                shippedName.value !== '' &&
                                shippedBarangay.value !== '' &&
                                shippedCity.value !== '' &&
                                shippedProvince.value !== '' &&
                                shippedCountry.value !== '' &&
                                shippedPostalCode.value !== ''
                            )
                            &&
                            (
                                shippedName.value !== order.value.shipped_name
                                || shippedBarangay.value !== order.value.shipped_barangay
                                || shippedCity.value !== order.value.shipped_city
                                || shippedProvince.value !== order.value.shipped_province
                                || shippedCountry.value !== order.value.shipped_country
                                || shippedPostalCode.value !== order.value.shipped_postal_code
                            )
                        ) {
                            buttonEnable.value = true;
                        } else {
                            buttonEnable.value = false;
                        }
                    }
        )
        
        const handleUpdatedOrder = () => {
            let editedOrder: Partial<IOrder> = {
                shippedName: shippedName.value,
                shippedBarangay: shippedBarangay.value,
                shippedCity: shippedCity.value,
                shippedProvince: shippedProvince.value,
                shippedCountry: shippedCountry.value,
                shippedPostalCode: shippedPostalCode.value
            }

                editOrderRecord(editedOrder)
                // closeModal();
            }

        const closeModal = () => {
            context.emit('close-modal');
        }

        const editOrderRecord = (editedOrder: Partial<IOrder>) => {
            context.emit('handle-edit', editedOrder);
        }

        return {
            buttonEnable,

            shippedName,
            shippedBarangay,
            shippedCity,
            shippedProvince,
            shippedCountry,
            shippedPostalCode,

            customers,
            products,

            closeModal,
            handleUpdatedOrder
        }
    }
})
</script>
<style lang="">
    
</style>