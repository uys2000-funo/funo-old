<template>
    <q-item clickable v-ripple v-if="notification.isActive">
        <q-item-section avatar>
            <q-avatar rounded>
                <img :src="src">
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label>
                {{ texts[notification.type][notification.innerType].title }}
            </q-item-label>
            <q-item-label caption lines="4">
                {{ texts[notification.type][notification.innerType].text.replace("${event}", notification.data.eName) }}
            </q-item-label>
        </q-item-section>

    </q-item>
</template>
<script>
import { getNotificationImage } from '@/services/app/notification';
import texts from "./texts.json"
export default {
    props: ["notification"],
    data() {
        return {
            src: "",
            texts: texts,
        }
    },
    mounted() {
        if (this.notification.isActive)
            getNotificationImage(this.notification.data.eID, this.notification.data.oID)
                .then(response => this.src = response)
                .catch(() => this.src = "https://cdn.quasar.dev/img/boy-avatar.png")
    }
}
</script>