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
import { getEvents } from "@/services/app/event"
export default {
    components: { compEvent },
    data() {
        return {
            eventsStore: useEvents(),
        }
    },
    methods: {
        createMethodArgs() {
            this.eventsStore.filterArgs = [
                {
                    column: "date.end",
                    condition: "<",
                    equality: "",
                    order: true,
                    where: true,
                    timestamp: true,
                },
            ]
            if (this.eventsStore.tags.length > 0)
                this.eventsStore.filterArgs.push({
                    column: "tags.main",
                    condition: "array-contains-any",
                    equality: this.eventsStore.tags,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })

            if (this.eventsStore.filter.ownerType != "all")
                this.eventsStore.filterArgs.push({
                    column: "owner.isPerson",
                    condition: "==",
                    equality: this.eventsStore.filter.ownerType == "true",
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })

            if (this.eventsStore.filter.hasApproval != "all")
                this.eventsStore.filterArgs.push({
                    column: "conditions.approval",
                    condition: "==",
                    equality: this.eventsStore.filter.hasApproval == "true",
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })

            if (this.eventsStore.filter.hasUserLimit != "all")
                this.eventsStore.filterArgs.push({
                    column: "conditions.userLimit",
                    condition: "==",
                    equality: 0,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })

            if (this.eventsStore.filter.hasPrice != "all")
                this.eventsStore.filterArgs.push({
                    column: "conditions.price",
                    condition: "==",
                    equality: 0,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })
            //if (this.eventsStore.filter.isOnline != "all")
            //    this.eventsStore.filterArgs.push({
            //        column: "location.isOnline",
            //        condition: "==",
            //        equality: this.eventsStore.filter.isOnline == "true",
            //        order: true,
            //        where: true,
            //        serverTimestamp: false,
            //    })

        },
        onLoad(index, done) {
            if (this.eventsStore.filter.hasPrice != "all") {

                this.createMethodArgs();
                getEvents("Event", 0, this.eventsStore.filterArgs).then(() => {
                    done(true)

                })
            }
            else done()
        },
    },

}

</script>