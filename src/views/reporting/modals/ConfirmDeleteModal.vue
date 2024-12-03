<template @close="closeDeleteModal">
    <modal>
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Delete Product</span>
                    <Close_Icon class="icon" @click="closeDeleteModal()"></Close_Icon>
                </div>
            </div>
            
            <div>
                <p>Are you sure you want to delete {{ entityType }} with ID
                    <strong>
                        {{ entityId }}
                    </strong>

                </p>
            </div>

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeDeleteModal()">Cancel</button>
                    <button class="danger" @click=" handleDeleteProduct()">Confirm</button>
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

    props: {
        entityType: {
            type: String
        },
        entityId: {
            type: Number
        }
    },

    emits: ['close-modal', 'handle-delete-product'],

    setup(props, context) {
        
        const entityType = ref(props.entityType)
        const entityId = ref(props.entityId)

        const closeDeleteModal = () => {
            context.emit('close-modal')
        }

        const handleDeleteProduct = () => {
            context.emit('handle-delete-product')
        }

        return {
            entityType,
            entityId,

            closeDeleteModal,
            handleDeleteProduct
        }
    }
})
</script>
<style lang="">
    
</style>