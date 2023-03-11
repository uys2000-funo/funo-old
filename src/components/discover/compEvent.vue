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
export default {
    props: ["user"],
    components: { compEvent },
    data() {
        return {
            props: ["user"],
            userStore: useUser(),
            eventsStore: useEvents(),
        }
    },
    methods: {
        onLoad(index, done) {
            getEvents(null, eventArgs.randomEvents).then(documents => {
                if (documents.length == 0) done(true)
                else this.eventsStore.addToMany(this.list, documents)
                done(true)
            })
        },
    },
    mounted() {
        console.log(this.user)
    },
    computed: {
        list() {
            return "RE-" + this.user?.uID
        }
    },
}
</script>