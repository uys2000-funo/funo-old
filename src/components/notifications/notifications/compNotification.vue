<template>
    <div class="fit">
        <template v-if="notificationsStore.notification.data.notification.type == 'request'">
            <comp-request :notification="notificationsStore.notification" />
        </template>
        <template v-if="notificationsStore.notification.data.notification.type == 'near'">
            <comp-near :notification="notificationsStore.notification" />
        </template>
        <template v-if="notificationsStore.notification.data.notification.type == 'start'">
            <comp-start :notification="notificationsStore.notification" />
        </template>
    </div>
</template>

<script>
import { useNotifications } from '@/store/notifications';
import compRequest from './notification/compRequest.vue';
import compNear from './notification/compNear.vue';
import compStart from './notification/compStart.vue';
export default {
    components: { compRequest, compNear, compStart },
    data() {
        return {
            notificationsStore: useNotifications()
        }
    },
}
</script>