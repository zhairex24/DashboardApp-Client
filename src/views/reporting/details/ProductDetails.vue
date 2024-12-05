<template>
    <header>
        <div class="title">
            Reporting / Products / Details
        </div>

        <button class="button is-cancel" style="margin-right: 2.8rem;" @click="$router.go(-1)">
            <Back_Icon class="nav_icon" />
            Go back
        </button>
    </header>

    <div class="details-body">

        <div class="details-content">
            <h4 class="details-label">Product Name:</h4>
            <p class="details-input-desc">{{ productName }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Category:</h4>
            <p class="details-input-desc">{{ category }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Supplier:</h4>
            <p class="details-input-desc">{{ supplier }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Unit Price:</h4>
            <p class="details-input-desc">{{ unitPrice }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Unit In Stock:</h4>
            <p class="details-input-desc">{{ unitsInStock }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Unit On Order:</h4>
            <p class="details-input-desc">{{ unitsOnOrder }}</p>
            <hr>
        </div>

        

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router'

import { getProductDetails } from '@/api/reporting/product';
import { loadCategories } from '@/api/common/categories';
import { loadSuppliers } from '@/api/reporting/supplier';

import Back_Icon from '@/assets/icons/Back_Icon.vue';
import utils from '@/composables/utils';

import { useStore } from 'vuex';

export default defineComponent({
    components: {
        Back_Icon
    },
    setup() {

        const route = useRoute()
        const store = useStore()

        const productName = ref('')
        const category = ref('')
        const supplier = ref('')
        const unitPrice = ref()
        const unitsInStock = ref()
        const unitsOnOrder = ref()

        const passedID = computed(() => {
            return route.params.id ? route.params.id as string : ''
        });

        const getDetails = async () => {

            let details = store.getters['productManagement/getProductDetails']

            if(!details) {
                details = await getProductDetails(passedID.value)
            }
            
            productName.value = details.product_name
            category.value = details.category.name
            supplier.value = details.supplier.company_name
            unitPrice.value = details.unit_price
            unitsInStock.value = details.units_in_stock
            unitsOnOrder.value = details.units_on_order
        }

        onBeforeMount(() => {
            getDetails()
        })

        return {
            productName,
            category,
            supplier,
            unitPrice,
            unitsInStock,
            unitsOnOrder,


            utils
        }
    }
})
</script>
