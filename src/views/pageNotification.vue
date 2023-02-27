<template>
    <div>
        <q-carousel :model-value="page" transition-prev="scale" transition-next="scale" swipeable animated
            control-color="white" navigation padding arrows class="bg-secondary fit " style="border-radius: 50px;">
            <q-carousel-slide name="notifications" class="column no-wrap flex-center" style="padding: 0px 10px;">
                <q-list separator class="full-width" style="min-height: 100%;">
                    <div v-for="notification in notifications.notifications" :key="notification">
                        <comp-notification :notification="notification" />
                    </div>
                </q-list>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
            </q-carousel-slide>
            <q-carousel-slide name="aprovals" class="column no-wrap flex-center">
                <q-infinite-scroll @load="onLoad" style="width:100%">
                    <div>
                        {{ notifications.aprovals }}
                    </div>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-carousel-slide>
            <q-carousel-slide name="announcements" class="column no-wrap flex-center">
                <q-infinite-scroll @load="onLoad" style="width:100%">
                    <div>
                        {{ notifications.announcements }}
                    </div>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>
<script>
import { notifications } from '@/store/notifications';
import compNotification from '@/components/notifications/compNotification.vue';
export default {
    components: { compNotification },
    props: ["page"],
    data() {
        return {
            notifications: notifications(),
        }
    },
    methods: {
        onLoad: function (index, done) {
            index
            done(true)
        }
    }
}
</script>