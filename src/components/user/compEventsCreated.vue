<template>
    <q-infinite-scroll class="full-width" @load="onLoad">
        <comp-event v-for="(event, index) in events.userCreatedEventsSorted" :key="index" :event="event" />
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>

<script>
import { events } from '@/store/events';
import { getEventsForUserCreated } from "@/services/app/event"
import compEvent from '../general/compEvent.vue';
import { user } from '@/store/user';
export default {
    components: { compEvent },
    data() {
        return {
            user: user(),
            events: events()
        }
    },
    methods: {
        onLoad(index, done) {
            const lastTime = index != 1 ? this.events.userCreatedLastTime : 0
            getEventsForUserCreated(this.user.uID, lastTime, 1).then((documents) => {
                this.events.addEventsForUserCreated(documents)
                done(documents.length == 0 || index == 3 ? true : false)
            })
        },
    }
}
</script>