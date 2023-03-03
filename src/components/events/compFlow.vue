<template>
    <q-infinite-scroll class="full-width" @load="onLoad">
        <comp-event v-for="(event, index) in eventsStore.eventFlowList" :key="index" :event="event" />
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>
<script>
import compEvent from '../general/compEvent.vue';
import { useEvents } from '@/store/event';

export default {
    components: { compEvent },
    data() {
        return {
            eventsStore: useEvents(),
        }
    },
    methods: {
        onLoad(index, done) {
            done(true)
        },
    },

}

</script>