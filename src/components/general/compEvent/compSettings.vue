<template>
    <div class="row justify-around no-wrap" style="height:35vw">
        <div class="btn fit">
            <q-btn rounded class="fit">
                <q-icon size="lg" name="share" color="primary" @click="shareEvent" />
                <div class="full-width text-caption">
                    Paylaş
                </div>
            </q-btn>
        </div>
        <template v-if="userStore.uID == event.data.owner.uID">
            <div class="btn fit">
                <q-btn rounded class="fit" :to="`/app/edit/${event.eID}/`">
                    <q-icon size="lg" name="edit_note" />
                    <div class="full-width text-caption">
                        Düzenle
                    </div>
                </q-btn>
            </div>
            <div class="btn fit">
                <q-btn rounded class="fit">
                    <q-icon size="lg" name="delete" color="negative" @click="deleteEvent" />
                    <div class="full-width text-caption">
                        Sil
                    </div>
                </q-btn>
            </div>
        </template>
        <template v-else>
            <div class="btn fit">
                <q-btn rounded class="fit" @click="openReport">
                    <q-icon size="lg" name="error" />
                    <div class="text-caption">
                        Şikayet Et
                    </div>
                </q-btn>
            </div>
            <div class="btn fit">
                <q-btn rounded class="fit">
                    <q-icon size="lg" name="frame_inspect" name2="iframe_off" />
                    <div class="text-caption">
                        Takip Et / Bırak
                    </div>
                </q-btn>
            </div>
        </template>

    </div>
</template>
<script>
import { deleteEvent, shareEvent } from '@/services/app/event';
import { useEvents } from '@/store/event.js';
import { useUser } from '@/store/user';

export default {
    props: ["event", "openReport"],
    data() {
        return {
            userStore: useUser(),
            eventsStore: useEvents()
        }
    },
    methods: {
        shareEvent() {
            shareEvent(this.event.eID)
        },
        deleteEvent() {
            deleteEvent(this.event.eID, this.user.uID)
            this.eventsStore.removeEvent(this.event.eID)
        }
    }
}
</script>
<style scoped>
.btn {
    text-align: center;
    margin: 10px;
    height: 75%;
}
</style>