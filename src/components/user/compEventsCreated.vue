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
            let startPoint = Timestamp.now()

            if (this.$route.params.uID)
                eventArgs.EventCreated[1].equality = this.$route.params.uID
            else
                eventArgs.EventCreated[1].equality = this.userStore.uID

            if (index - 1 != 0)
                startPoint = this.eventsStore.getLast(this.list).data.timestamp

            getEvents(startPoint, eventArgs.EventCreated).then(documents => {
                if (documents.length == 0) done(true)
                else this.eventsStore.addToMany(this.list, documents)
                done()
            })
        },
    },
    mounted() {
        console.log(this.user)
    },
    computed: {
        list() {
            return "CE-" + this.user?.uID
        }
    },
}
</script>