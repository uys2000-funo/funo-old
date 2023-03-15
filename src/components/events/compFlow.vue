<template>
    <q-infinite-scroll ref="flow" class="fit" @load="onLoad">
        <comp-event v-for="(eID, index) in eventsStore.lists[this.list]" :key="index" :event="eventsStore.dict[eID]" />
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
import eventArgs from "@/services/app/event.json"
import { useLocation } from '@/store/location';
export default {
    components: { compEvent },
    data() {
        return {
            eventsStore: useEvents(),
            locationStore: useLocation(),
            list: "EventFlow"
        }
    },
    methods: {
        reset() {
            this.$refs.flow.stop()
            this.$refs.flow.reset()
            this.$refs.flow.resume()
            this.$refs.flow.poll()
        },
        createMethodArgs() {
            this.eventsStore.filterArgs = [
                eventArgs.EventFlow.default
            ]
            if (this.eventsStore.tags.length > 0) {
                eventArgs.EventFlow.tags.equality = this.eventsStore.tags
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.tags)
            }

            if (this.eventsStore.filter.ownerType != "all") {
                eventArgs.EventFlow.ownerType.equality = this.eventsStore.filter.ownerType == "true"
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.ownerType)
            }

            if (this.eventsStore.filter.hasApproval != "all") {
                eventArgs.EventFlow.hasApproval.equality = this.eventsStore.filter.hasApproval == "true"
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasApproval)
            }

            if (this.eventsStore.filter.hasUserLimit != "all")
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasUserLimit)

            if (this.eventsStore.filter.hasPrice != "all")
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasPrice)

            if (this.eventsStore.filter.isOnline == "false") {
                eventArgs.EventFlow.location.column = "location.city"
                eventArgs.EventFlow.location.equality = this.locationStore.city
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.location)
            }

            eventArgs.EventFlow.isOnline.equality = this.eventsStore.filter.isOnline == "true"
            this.eventsStore.filterArgs.push(eventArgs.EventFlow.isOnline)

        },
        onLoad(index, done) {
            this.createMethodArgs();

            const startPoint = this.eventsStore.getLast(this.list)?.data.date.end

            if (this.eventsStore.filter.isOnline == "false" && this.locationStore.city == "")
                setTimeout(() => this.onLoad(index, done), 100);
            else
                getEvents(startPoint, this.eventsStore.filterArgs).then(documents => {
                    this.eventsStore.addToMany(this.list, documents)
                    done(documents.length == 0)
                }).catch(() => done(true))
        },
    },

}

</script>