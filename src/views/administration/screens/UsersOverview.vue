<template>
    <div class="body">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Date Registered</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Last login</th>
                    <th>Is Active?</th>
                    <th>Is blocked?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, i) in users" :key="1">
                    <td>{{ i+1 }}</td>
                    <td>{{ user.id }}</td>
                    <td>{{ utils.formatDate(user.date_joined) }}</td>
                    <td>{{ user.first_name }} {{ user.last_name }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ utils.formatDate(user.last_login) }}</td>
                    <td>{{ (user.is_active) ? "Yes" : "No" }}</td>
                    <td>{{ (user.is_blocked) ? "Yes" : "No" }}</td>
                </tr>
            </tbody>
        </table>
    </div>
        
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import utils from '@/composables/utils';

export default defineComponent({
    setup() {
        const store = useStore()
        const users = computed(() => {
            let data = store.getters['administrationManagement/getUsers']
            if (!data) return
            return data
        })

        return {
            users,
            utils
        }
    }
})
</script>
<style lang="scss">

</style>