<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action__title">
            <h3><b>Delete user</b></h3>
        </div>
        <div class="admin-action__content">
            <div class="single-select">
                <label>Please select a user to unblock</label>
                <select v-model="username">
                    <option v-for="(user, index) in blockedUsers" :key="index" :value="user.username">
                        {{ user.username }}
                    </option>
                </select>
            </div>

            <button :disabled="!buttonEnable" class="button is-primary" @click="unblockUser">
                Unblock
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import { IUser } from '@/models/IUser';

export default defineComponent({

        setup() {
            const store = useStore()

            const username = ref('')

            const users = computed(() => {
                let data = store.getters['administrationManagement/getUsers']
                if (!data) return
                return data
            })

            const blockedUsers = computed(() => {
                let data = users.value
                let blockUsers = data.filter((user: IUser) => user.is_blocked === true)
                return blockUsers
            })

            const buttonEnable = ref(false)

            watch(
                () => [username.value],
                () => {
                    if (username.value !== '') {
                        buttonEnable.value = true
                    } else {
                        buttonEnable.value = false
                    }
                }
            )

            const unblockUser = async () => {
                await store.dispatch('administrationManagement/unblockUser', username.value)
                resetDropdown()
            }

            const resetDropdown = () => {
                username.value = 'null'
            }

            return {

                blockedUsers,
                buttonEnable,
                username,
                
                unblockUser,
            };
        },
});

</script>
<style lang='scss'>
@import '@/styles/components/administration.scss';
</style>
