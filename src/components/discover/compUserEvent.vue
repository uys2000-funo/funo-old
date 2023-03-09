<template>
    <q-infinite-scroll class="full-width column no-wrap" @load="onLoad">
        <div class="fit q-px-xs row justify-around">
            <template v-for="(eID, index) in eventsStore.lists[eventList]" :key="index">
                <comp-event :event="eventsStore.dict[eID]" />
            </template>
        </div>
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>

<script>
import { useUser, useUsers } from "@/store/user"
import compEvent from "../general/compEvent.vue"
import { useEvents } from "@/store/event"
import { getFollowedUsers } from "@/services/app/user"
import event from "@/services/app/event.json"
import { getEvents } from "@/services/app/event"
export default {
    components: { compEvent },
    data() {
        return {
            userStore: useUser(),
            usersStore: useUsers(),
            eventsStore: useEvents(),
            users: [],
        }
    },
    methods: {
        getFollowedUsers() {
            return getFollowedUsers(this.userStore.uID, null).then(docs =>
                this.users = docs.map(doc => doc.data.fID)
            )
        },
        getEvents(done) {
            event.followedUserEvent[1].equality = this.users
            const last = this.eventsStore.getLast(this.eventList)?.data.date.end
            return getEvents(last, event.followedUserEvent).then(docs => {
                this.eventsStore.addToMany(this.eventList, docs)
                done(docs.length == 0)
            })
        },
        onLoad(index, done) {
            if (index == 1) this.getFollowedUsers().then(() => this.getEvents(done))
            else this.getEvents(done)
        }
    },
    computed: {
        eventList() {
            return "FE-" + this.userStore.uID
        }
    },
    mounted() {

    }
}
</script>
