<template>
    <div class="q-px-xs">
        <div class="row no-wrap justify-between">
            <q-btn flat dense no-caps class="row no-wrap items-center" @click="toOwner">
                <q-avatar size="md" class="shadow-2 q-mr-sm">
                    <img v-if="event.data.owner?.photoURL" :src="event.data.owner?.photoURL" alt="">
                    <q-icon v-else name="person" />
                </q-avatar>
                <span>
                    {{ event.data.owner?.nickName }}
                </span>
            </q-btn>
            <div flat dense no-caps class="row no-wrap items-center justify-end">
                <span>
                    {{ event.data.general?.name }}
                </span>
                <q-btn flat dense no-caps round class="q-ml-sm" @click="openSettings">
                    <q-avatar size="md">
                        <q-icon round :name="icon"></q-icon>
                    </q-avatar>
                </q-btn>
            </div>
        </div>
    </div>
</template>
<script>
import { useUser } from '@/store/user';

export default {
    props: ["event", "openSettings", "icon"],
    data() {
        return {
            userStore: useUser()
        }
    }
    ,
    methods: {
        toOwner() {
            if (this.event.data.owner.uID == this.userStore.uID) {
                this.$router.push({ name: "UserPage" })
            } else {
                this.$router.push({ name: "UserPageID", params: { uID: this.event.data.owner.uID } })
            }
        }
    }
}
</script>