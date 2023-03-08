<template>
    <div class="fit">
        <template v-if="notificationsStore.notification.data.notification.type == 'request'">
            <comp-request :notification="notificationsStore.notification" />
        </template>
    </div>
</template>

<script>
import { useNotifications } from '@/store/notifications';
import compRequest from './notification/compRequest.vue';
export default {
    components: { compRequest },
    data() {
        return {
            notificationsStore: useNotifications()
        }
    },
}
</script>