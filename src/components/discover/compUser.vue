<template>
    <q-infinite-scroll class="full-width column no-wrap" @load="onLoad">
        <div class="fit q-px-xs row justify-around">
            <div v-for="(uID, index) in usersStore.lists[list]" :key="index" class="sz">
                <comp-user :user="usersStore.dict[uID]" />
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
import { getNewUsers } from "@/services/app/user"
import compUser from "../general/compUser.vue"
export default {
    components: { compUser },
    data() {
        return {
            usersStore: useUsers(),
            list: "newUsers"
        }
    },
    methods: {
        getNewUsers() {
            const last = this.usersStore.getLast(this.list)?.data?.timestamp
            return getNewUsers(last)
        },
        onLoad(index, done) {
            this.getNewUsers().then((docs) => {
                this.usersStore.addToMany(this.list, docs)
                done(docs.length == 0)
            })
        }
    }
}
</script>

<style scoped>
.sz {
    width: 30vw;
    height: 30vw;
}
</style>