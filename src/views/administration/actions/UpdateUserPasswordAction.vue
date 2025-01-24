<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action__title">
            <h3><b>Update user password</b></h3>
        </div>
        <div class="admin-action__content">
            <div class="single-select">
                <label>Please select a user to change password</label>
                <select v-model="username">
                    <option v-for="(user, index) in filteredUsers" :key="index" :value="user.username">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" required name="password" v-model.trim="password">
            </div>

            <button :disabled="!buttonEnable" class="button is-primary" @click="resetUserPassword">
                Reset Password
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import utils from '@/composables/utils';

import { get as getFromStore } from '@/local-storage';
import { IUser } from '@/models/IUser';

export default defineComponent({

        setup() {
            const store = useStore()

            const username = ref('')
            const password = ref('')

            const users = computed(() => {
                let data = store.getters['administrationManagement/getUsers']
                if (!data) return
                return data
            })

            // const loggedUser = computed(() => getFromStore('logged.username'))

            const filteredUsers = computed(() => {
                let filteredData = utils.filterNoAdminUsers(users.value)
                return filteredData
            })

            const buttonEnable = ref(false)

            watch(
                () => [username.value, password.value],
                () => {
                    if (username.value !== '' && password.value !== '') {
                        buttonEnable.value = true
                    } else {
                        buttonEnable.value = false
                    }
                }
            )

            const resetUserPassword = async () => {
                const body = {
                    new_passwd: password.value,
                    target_user: username.value
                }
                let status = await store.dispatch('administrationManagement/updateUserPassword', body)

                if (status) {
                    cleanForm()
                }
            }

            const cleanForm = () => {
                username.value = '',
                password.value = ''
            }

            return {
                buttonEnable,
                filteredUsers,
                username,
                password,
                
                resetUserPassword,
                cleanForm,
            };
        },
});

</script>
<style lang='scss'>
@import '@/styles/components/administration.scss';
</style>
