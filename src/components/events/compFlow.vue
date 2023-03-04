<template>
    <q-infinite-scroll ref="flow" class="full-width" @load="onLoad">
        <comp-event v-for="(event, index) in eventsStore[this.events]" :key="index" :event="event" />
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
import { useLocation } from '@/store/location';
import { showAlert } from '@/services/capacitor/dialog';
import { Timestamp } from '@firebase/firestore';
export default {
    components: { compEvent },
    data() {
        return {
            eventsStore: useEvents(),
            locationStore: useLocation(),
            events: "flow",
            eventList: "listFlow"
        }
    },
    methods: {
        reset() {
            this.$refs.flow.reset()
            this.$refs.flow.trigger()
        },
        createMethodArgs() {
            this.eventsStore.filterArgs = [
                {
                    column: "date.end",
                    condition: ">",
                    equality: "",
                    orderType: "asc",
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
            if (this.eventsStore.filter.isOnline == "false") {
                this.eventsStore.filterArgs.push({
                    column: "location.city",
                    condition: "==",
                    equality: this.locationStore.city,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })
            } else {
                this.eventsStore.filter.isOnline = "true"
                this.eventsStore.filterArgs.push({
                    column: "location.isOnline",
                    condition: "==",
                    equality: true,
                    order: false,
                    where: true,
                    serverTimestamp: false,
                })
            }


        },
        onLoad(index, done) {
            this.createMethodArgs();
            const i = index - 1
            let startPoint = Timestamp.now()
            if (i != 0)
                startPoint = this.eventsStore.lastItemFrom(this.eventList).date.end
            if (this.eventsStore.filter.isOnline == "false" && this.locationStore.city == "")
                setTimeout(() => this.onLoad(index, done), 100);
            else
                getEvents(startPoint, this.eventsStore.filterArgs).then(documents => {
                    if (documents.length == 0) done(true)
                    else this.eventsStore.addListTo(this.eventList, documents)
                    done()
                }).catch(() => showAlert("error", "Mevcut Filtreler optimize edilmemiş").then(() => done(true)))
        },
    },

}

</script>