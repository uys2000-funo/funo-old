<template>
    <q-infinite-scroll class="full-width" @load="onLoad">
        <comp-event v-for="(event, index) in eventsStore[this.events]" :key="index" :event="event" />
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
import { getEvents } from '@/services/app/event';
import { Timestamp } from '@firebase/firestore';
export default {
    components: { compEvent },
    data() {
        return {
            userStore: useUser(),
            eventsStore: useEvents(),
            events: "created",
            eventList: "listCreated",
            args: [
                {
                    column: "timestamp",
                    condition: "",
                    equality: "",
                    orderType: "desc",
                    order: true,
                    where: false,
                    serverTimestamp: true,
                }, {
                    column: "owner.uID",
                    condition: "==",
                    equality: useUser().uID,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                },
            ]
        }
    },
    methods: {
        onLoad(index, done) {
            const i = index - 1
            let startPoint = Timestamp.now()
            if (i != 0)
                startPoint = this.eventsStore.lastItemFrom(this.eventList).timestamp
            getEvents(startPoint, this.args).then(documents => {
                if (documents.length == 0) done(true)
                else this.eventsStore.addListTo(this.eventList, documents)
                done()
            })
        },
    }
}
</script>