<template>
    <q-infinite-scroll class="full-width column no-wrap" @load="onLoad">
        <div class="fit q-px-xs row justify-around">
            <template v-for="(aID, index) in atmospheresStore.lists[list]" :key="index">
                <comp-atmosphere :aID="aID" :aData="atmospheresStore.dict[aID].data" />
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
import { useAtmospheres } from "@/store/atmosphere"
import { getAtmospheres } from "@/services/app/atmosphere"
import compAtmosphere from "../general/compAtmosphere.vue"
export default {
    components: { compAtmosphere },
    data() {
        return {
            atmospheresStore: useAtmospheres(),
            list: "newUsers"
        }
    },
    methods: {
        getAtmospheres() {
            const last = this.atmospheresStore.getLast(this.list)?.data?.utimestamp
            return getAtmospheres(last)
        },
        onLoad(index, done) {
            this.getAtmospheres().then((docs) => {
                this.atmospheresStore.addToMany(this.list, docs)
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