<template>
    <template v-if="show && eventData?.location.coordinates">
        <ymap-marker marker-id="1" :coords="eData.location.coordinates" :icon="markerIcon" @click="clickEvent" />
    </template>
</template>
<script>
import { ymapMarker } from "vue-yandex-maps";
import { getEvent } from '@/services/app/event'

export default {
    components: { ymapMarker },
    props: ["eID", "eData"],
    data() {
        return {
            show: false,
            eventData: {},
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '',
                imageSize: [50, 50],
                imageOffset: [-25, -50],
                contentOffset: [-25, -25],
            }
        }
    },
    methods: {
        clickEvent() {
            this.$router.push({ path: `/app/event/${this.eID}` })
        }
    },
    mounted() {
        if (this.eData) {
            this.eventData = this.eData
            this.show = true
        }
        else {
            getEvent(this.eID).then(event => {
                this.eventData = {
                    ...event.data
                }
                this.show = true
            })
        }
    }
}
</script>