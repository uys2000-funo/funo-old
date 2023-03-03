<template>
    <q-infinite-scroll class="full-width" @load="onLoad">
        <comp-event v-for="(event, index) in events.flowEventsSorted" :key="index" :event="event" />
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>
<script>
import { getEventsForFlow } from '@/services/app/event';
import compEvent from '../general/compEvent.vue';
import { events } from '@/store/event';

export default {
    components: { compEvent },
    data() {
        return {
            events: events(),
        }
    },
    methods: {
        onLoad(index, done) {
            const lastTime = index != 1 ? this.events.flowLastTime : 0
            getEventsForFlow(lastTime, 1).then((documents) => {
                this.events.addEventsForFlow(documents)
                done(documents.length == 0 || index == 3 ? true : false)
            })
        },
    },

}

</script>