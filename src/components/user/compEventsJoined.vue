<template>
    <q-infinite-scroll class="full-width" @load="onLoad">
        <comp-event v-for="(eID, index) in eventsStore.lists[list]" :key="index" :event="eventsStore.dict[eID]" />
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>

<script>
import { useEvents } from '@/store/event';
import compEvent from '../general/compEvent.vue';
import { useUser } from '@/store/user';
import eventArgs from "@/services/app/event.json"
import { getEvents } from '@/services/app/event';
import { Timestamp } from '@firebase/firestore';
export default {
    components: { compEvent },
    data() {
        return {
            userStore: useUser(),
            eventsStore: useEvents(),
            list: "Joined",
        }
    },
    methods: {
        onLoad(index, done) {
            let startPoint = Timestamp.now()
            eventArgs.EventJoined[1].equality = this.userStore.uID
            if (index - 1 != 0)
                startPoint = this.eventsStore.getLast(this.list).data.timestamp
            getEvents(startPoint, eventArgs.EventJoined, "UserJoinedEvent").then(documents => {
                if (documents.length == 0) done(true)
                else this.eventsStore.addToMany(this.list, documents)
                done()
            })
        },
    }
}
</script>