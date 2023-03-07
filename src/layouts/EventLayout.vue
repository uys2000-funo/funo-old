<template>
    <router-view v-slot="{ Component }">
        <comp-popup fullscreen v-if="show">
            <div class="fit column no-wrap align-center overflow-hidden">
                <comp-image :photoURLs="eventStore.event.data.general.photoURLs" />
                <div class=" full-width absolute row items-center align-center">
                    <div class="col-4">
                        <backButton />
                    </div>
                    <div class="col-4 text-center">
                        <q-avatar class="shadow-7">
                            <img :src="eventStore.event.data.owner.photoURL" alt="">
                        </q-avatar>
                    </div>
                    <div class="col-4">
                    </div>
                </div>
                <div class="text-h6 text-center q-pt-md">
                    {{ eventStore.event.data.general.name }}
                </div>
                <div class="fit  overflow-hidden">
                    <component :is="Component" />
                </div>
            </div>
        </comp-popup>
    </router-view>
</template>
<script>
import compPopup from '@/components/general/compPopup.vue';
import backButton from '@/components/general/backButton.vue';
import compImage from '@/components/event/compImage.vue';
import { useEvent } from '@/store/event';
import { getEvent } from '@/services/app/event';
export default {
    components: { compPopup, backButton, compImage },
    data() {
        return {
            show: false,
            fullscreen: false,
            eventStore: useEvent(),
            images: 0,
        }
    },
    mounted() {
        if (this.$route.params.eID) {
            if (!this.eventStore.event?.data?.general?.name) getEvent(this.$route.params.eID).then(document => {
                this.eventStore.event = {
                    data: document.data,
                    eID: this.$route.params.eID
                }
                this.show = true
            })
            else this.show = true
        }

    }
}
</script>