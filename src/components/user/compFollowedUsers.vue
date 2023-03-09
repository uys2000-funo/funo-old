<template>
    <q-infinite-scroll class="full-width column no-wrap" @load="onLoad">
        <div class="fit q-px-xs row justify-around">
            <div v-for="(uID, index) in usersStore.lists[list]" :key="index" class="sz">
                <comp-user :uID="usersStore.dict[uID].data.fID" />
            </div>
        </div>
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
    </q-infinite-scroll>
</template>

<script>
import { useUsers } from "@/store/user"
import { getFollowedUsers } from "@/services/app/user"
import compUser from "../general/compUser.vue"
export default {
    components: { compUser },
    props: ["user"],
    data() {
        return {
            usersStore: useUsers(),
        }
    },
    methods: {
        getFollowedUsers() {
            const last = this.usersStore.getLast(this.list)?.data?.timestamp
            return getFollowedUsers(this.user.uID, last)
        },
        onLoad(index, done) {
            this.getFollowedUsers().then((docs) => {
                this.usersStore.addToMany(this.list, docs)
                done(docs.length == 0)
            })
        }
    },
    computed: {
        list() {
            return "F-" + this.user.uID
        }
    }
}
</script>

<style scoped>
.sz {
    width: 30vw;
    height: 30vw;
    margin-bottom: 5;
    margin-top: 10px;
}
</style>