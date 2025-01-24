<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action__title">
            <h3>
                <b>
                    Update user's password
                </b>
            </h3>
        </div>
        <div class="admin-action__content">
            <input type="password" v-model.trim="password" placeholder="New Password">
            <input type="password" v-model.trim="confirmPassword" placeholder="Confirm Password">
        </div>
        <button class="button is-primary" @click="updateUserPassword">Update</button>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue';
import { resetOwnPassword } from '@/api/admin/users';
import router from '@/router';
import { get as getFromStore, remove as removeFromStore } from '@/local-storage';

export default defineComponent({
    components: {},
    emits: [],

    setup() {
        const password = ref('')
        const confirmPassword = ref('')
        const username = computed(() => getFromStore('logged.username'))

        const logout = () => {
            removeFromStore('logged')
        }

        const updateUserPassword = async () => {
            const body = {
                new_passwd: password.value,
                confirm_passwd: confirmPassword.value
            }

            const status = await resetOwnPassword(body);

            if(status?.status === 200) {
                logout()
                router.push({
                    name: 'dashboard'
                })
            }
        }

        return {
            password,
            confirmPassword,

            updateUserPassword
        }
    }
})
</script>
<style lang='scss' scoped>
@import '@/styles/components/administration.scss';
</style>