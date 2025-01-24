<template>
    <header>
        <span class="title">User Settings</span>
    </header>
    <Tabs>
        <Tab title="Reset Password">
            <reset-own-pasword-action></reset-own-pasword-action>
        </Tab>
        <Tab title="Update Profile">
            <update-own-profile-action :user="user" v-if="!requiresReset"></update-own-profile-action>
            <p v-else>{{ NOT_AUTHORIZE }}</p>
        </Tab>
        <Tab title="Deactivate Profile">
            <deactivate-self-action v-if="!requiresReset"></deactivate-self-action>
            <p v-else>{{ NOT_AUTHORIZE }}</p>
        </Tab>
    </Tabs>        
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';

import DeactivateSelfAction from './DeactivateSelfAction.vue';
import ResetOwnPaswordAction from './ResetOwnPaswordAction.vue';
import UpdateOwnProfileAction from './UpdateOwnProfileAction.vue';
import { get as getFromStore } from '@/local-storage';

export default defineComponent({
    components: {
        DeactivateSelfAction,
        ResetOwnPaswordAction,
        Tab,
        Tabs,
        UpdateOwnProfileAction,
    },

    setup() {

        const NOT_AUTHORIZE = 'You are not authorized to see this section, you have to update your password first!'

        const requiresReset = computed(() => {
            Boolean(getFromStore('logged.requires_reset'))
        })

        const userId = computed(() => {
            return getFromStore('logged.id')
        })

        const store = useStore()

        const setUser = async () => {
            return Promise.allSettled([
                store.dispatch('administrationManagement/setUser', userId.value)
            ])
        }

        const user = computed(() => {
            let user = store.getters['administrationManagement/getUser']
            return user
        })


        onMounted(() => {
            setUser()
        })
        // console.log('asds', getFromStore('logged.requires_reset'))

        return {
            NOT_AUTHORIZE,
            requiresReset,
            user,
        }
    }
})
</script>
<style lang="scss">

</style>