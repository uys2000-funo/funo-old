<template>
    <q-infinite-scroll ref="inf" class="fit column no-wrap overflow-auto" @load="onload" style="flex-grow: 1;">
        <template v-for="(mID, index) in messageStore.lists[userStore.uID]" :key="index">
            <div class=" rounded shadow-3 row no-wrap q-pt-sm q-pb-sm q-px-sm q-mx-xs">
                <q-avatar size="lg" class="q-mr-sm shadow-10">
                    <img v-if="messageStore.dict[mID].data.photoUrl" :src="messageStore.dict[mID].data.photoUrl" alt="">
                    <q-icon v-else name="person" />
                </q-avatar>
                <div class="column justify-center overflow-hidden" style="flex-grow: 1;">
                    <div class="full-width overflow-hidden" style="overflow-wrap: break-word;">
                        {{ messageStore.dict[mID].data.lastMessage }}
                    </div>
                </div>
                <q-avatar size="lg" class="q-mr-sm" v-ripple @click="updatePage(messageStore.dict[mID].data)">
                    <q-icon name="arrow_forward_ios" />
                </q-avatar>
            </div>
        </template>
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>

<script>
import { getMessageHistory, watchMessageHistory } from '@/services/app/messages';
import { useMessages } from '@/store/messages';
import { useUser } from '@/store/user';
export default {
    props: ["updateProps"],
    data() {
        return {
            userStore: useUser(),
            messageStore: useMessages(),
            listener: null,
        }
    },
    methods: {
        onload(index, done) {
            const last = this.messageStore.getLast(this.userStore.uID)?.data.timestamp
            getMessageHistory(this.userStore.uID, last)
                .then(docs => {
                    this.messageStore.addToMany(this.userStore.uID, docs)
                    done(docs.length == 0)
                })
        },
        updatePage(data) {
            if (this.updateProps) this.updateProps("message", data.uID, data.photoUrl)
        }
    },
    mounted() {
        this.$refs.inf.trigger()
        this.listener = watchMessageHistory(this.userStore.uID, (doc) => this.onload(this.userStore.uID, doc))
    },
    beforeUnmount() {
        if (this.listener) this.listener()
    }
}
</script>
<style scoped>
.rounded {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
}
</style>