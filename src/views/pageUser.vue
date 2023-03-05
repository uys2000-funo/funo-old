<template>
    <q-carousel :model-value="p" :transition-prev="animation" :transition-next="animation" animated infinite
        class="fit bg-secondary text-black" keep-alive>
        <q-carousel-slide :name="0" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-followed-users :user="user" />
        </q-carousel-slide>
        <q-carousel-slide :name="1" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-events-joined :user="user" />
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-events-created :user="user" />
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-edit />
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-settings />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compFollowedUsers from '@/components/user/compFollowedUsers.vue';
import compEventsJoined from '@/components/user/compEventsJoined.vue';
import compEventsCreated from '@/components/user/compEventsCreated.vue';
import compEdit from '@/components/user/compEdit.vue';
import compSettings from '@/components/user/compSettings.vue';
export default {
    components: {
        compFollowedUsers, compEventsJoined, compEventsCreated, compEdit, compSettings,
    },
    props: ["pageNumber", "setPage", "images", "user", "type"],
    data() {
        return {
            animation: "slide-left",
        };
    },
    computed: {
        p() {
            const r = (this.pageNumber + 2) % 5
            return r < 0 ? r + 5 : r
        }
    },
    watch: {
        pageNumber(nVal, oVal) {
            if (nVal > oVal) this.animation = "slide-left";
            else if (nVal < oVal) this.animation = "slide-right";
        },
    },
};
</script>
  