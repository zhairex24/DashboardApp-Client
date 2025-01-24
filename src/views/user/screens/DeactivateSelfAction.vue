<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action__title">
            <h3>
                <b>
                    Are you sure you want to deactivate your profile?
                </b>
            </h3>
        </div>
        <div class="admin-action__content">
            <div>
                <button class="button is-primary" @click="deactivateProfile">Deactivate</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '@/router';
import { deactivate } from '@/api/admin/users';
import { get as getFromStore, remove as removeFromStore } from '@/local-storage';

export default defineComponent({
    components: {},
    props: {},
    emits: [],

    setup() {
        const username = computed(() => getFromStore('logged.username'))

        const deactivateProfile = async () => {
            var status = confirm("Are you sure want to do that?")

            if(status == true) {
                deactivate(username.value)
                    .then(() => {
                        removeFromStore('logged')
                        router.push({
                                name: 'dashboard'
                            })
                    })
            } else {
                console.log('Problem in deactivation profile')
            }
        }

        return {
            deactivateProfile,
        }
    }
})
</script>
<style lang='scss' scoped>
@import '@/styles/components/administration.scss';
</style>