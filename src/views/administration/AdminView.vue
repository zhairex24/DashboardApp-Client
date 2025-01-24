<template>
    <Tabs>
        <Tab title="Add new user">
            <add-user-action></add-user-action>
        </Tab>

        <Tab title="Delete user">
            <delete-user-action></delete-user-action>
        </Tab>
        
        <Tab title="Unblock user">
            <unblock-user-action></unblock-user-action>
        </Tab>
        
        <Tab title="Update User Password">
            <update-user-password-action></update-user-password-action>
        </Tab>

    </Tabs>
    <div>
        <users-overview class="users"></users-overview>
    </div>
        
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import UsersOverview from './screens/UsersOverview.vue';
import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';
import AddUserAction from './actions/AddUserAction.vue';
import DeleteUserAction from './actions/DeleteUserAction.vue';
import UnblockUserAction from './actions/UnblockUserAction.vue';
import UpdateUserPasswordAction from './actions/UpdateUserPasswordAction.vue';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        UsersOverview,
        Tab,
        Tabs,
        AddUserAction,
        DeleteUserAction,
        UnblockUserAction,
        UpdateUserPasswordAction,
    },

    setup() {
        const store = useStore()

        const updateList = async () => {
            return Promise.allSettled([
                store.dispatch('administrationManagement/setUsers')
            ])
        }

        onMounted(() => {
            updateList()
        })

        return {

        }
    }
})
</script>
<style lang="scss">
@import '@/styles/components/administration.scss';
</style>