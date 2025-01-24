<template>
    <div class="admin-action">
        <div class="admin-action__title">
            <h3><b>Update your profile</b></h3>
        </div>
        <div class="admin-action__content">
            <form @submit.prevent="submitForm">
                <div>
                    <label for="username">Username</label>
                    <input type="text" required name="username" v-model.trim="username">
                </div>
                <div>
                    <label for="firstName">First Name</label>
                    <input type="text" required name="firstName" v-model.trim="firstName">
                </div>
                <div>
                    <label for="lastName">Last Name</label>
                    <input type="text" required name="lastName" v-model.trim="lastName">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" required name="email" v-model.trim="email">
                </div>
                <button class="button is-primary">Save</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { get as getFromStore, load as loadFromStore, save as saveToStore } from '@/local-storage/index';

export default defineComponent({
    components: {},
    props: {
        user: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const store = useStore()
        const username = ref(props.user.username)
        const _username = ref(props.user.username)
        const firstName = ref(props.user.first_name)
        const lastName = ref(props.user.last_name)
        const email = ref(props.user.email)

        const submitForm = async () => {
                const body = {
                    username: username.value,
                    first_name: firstName.value,
                    last_name: lastName.value,
                    email: email.value,
                    _username: _username.value
                };

                let status = await store.dispatch('administrationManagement/updateOwnProfile', body)

                if (status) {
                    cleanForm()
                    updateUI(body.username)
                }
            }

            const updateUI = (username: string) => {
                loadFromStore('logged')

                const { is_admin, access_token, refresh_token, requires_reset, id } = getFromStore('logged')

                saveToStore('logged', {
                    username: username,
                    id: id,
                    is_admin: is_admin,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    requires_reset: requires_reset,
                })
            }

            const cleanForm = () => {
                username.value = '',
                firstName.value = '',
                lastName.value = '',
                email.value = ''
            }

            return {
                email,
                firstName,
                lastName,
                username,

                submitForm,
            };
    }
})
</script>
<style lang="scss">

</style>