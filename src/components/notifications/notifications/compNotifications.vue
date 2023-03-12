<template>
    <q-infinite-scroll class="fit" ref="notifications" @load="onLoad" :offset="250">
        <q-list class="fit">
            <template v-for="(nID, index) in notificationsStore.lists[list]" :key="index">
                <comp-item :notification="notificationsStore.dict[nID]"/>
            </template>

        </q-list>
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>
<script>
import { getNotifications } from "@/services/app/notification"
import { useNotifications } from "@/store/notifications";
import { useUser } from "@/store/user";
import compItem from "./compItem.vue";
export default {
    components: { compItem },
    data() {
        return {
            userStore: useUser(),
            notificationsStore: useNotifications(),
            list: "Notifications",
        }
    },
    methods: {
        getNotifications() {
            const last = this.notificationsStore.getLast(this.list)?.data.nTimestamp
            return getNotifications(this.userStore.uID, last).then(docs => {
                this.notificationsStore.addToMany(this.list, docs)
                return docs.length
            })
        },
        onLoad(index, done) {
            this.getNotifications().then(length => done(length == 0))
        }
    },
    mounted() {
        this.$refs.notifications.trigger()
    }
}
</script>