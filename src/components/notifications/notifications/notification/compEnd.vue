## For event which is ended

<template>
    <div class="fit column no-wrap q-py-sm">
        <div class="text-h6 q-pl-md">
            Etkinlik Bitti :)
        </div>
        <q-img class="full-width" style="height:40vw" :src="notification.data.notification.ePhotoURL" />
        <div class="fit">
            <p class="q-px-md q-pt-lg">
                Aklımızda deli sorular var. Mesela etkinlik nasıldı? Etkinlikten memnun kaldın mı? Tüm cevapları yorum yaomak ister misin? :)
            </p>
        </div>
        <div class="text-center">
            <q-btn class="bg-primary" @click="openEvent">
                Etkinliği Aç
            </q-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ["notification"],
    data() {
        return {
        }
    },
    methods: {
        openEvent() {
            console.log(this.notification)
            this.$router.push("/app/event/" + this.notification.data.notification.eID)
        }
    }
}
</script>