## Approval

<template>
    <div class="fit column no-wrap">
        <div class="text-h6 q-pl-md">
            Etkinlik Onayı
        </div>
        <div class="text-center q-pa-md q-my-md q-mx-auto shadow-3 rounded-borders float-right" style="width: fit-content;">
            <div>
                <q-avatar size="2xl" class="shadow-3">
                    <img v-if="notification.data.notification.uPhotoURL" :src="notification.data.notification.uPhotoURL">
                    <q-icon v-else name="person" />
                </q-avatar>
            </div>
            <div class="text-h6">
                {{ notification.data.notification.uName }}
            </div>
        </div>
        <div class="fit  q-px-sm">
            {{ notification.data.notification.uName }} adlı kullanıcı,
            {{ notification.data.notification.eName }} adlı
            etkinliğe katılmak istiyor. Katılmasını istiyor isen Aşağıdan Onaylayabilirsin :)
        </div>
        <div class="row no-wrap text-white" v-if="!notification.data.notification.isAnswered">
            <q-btn :disable="isDisabled" class="fit bg-primary" @click="aprovalButton">
                Onayla
            </q-btn>
            <q-btn :disable="isDisabled" class="fit bg-negative" @click="refuseButton">
                Reddet
            </q-btn>
        </div>
        <div v-else class="text-center shadow-3 q-pt-md">
            Bu İsteği Cevapladın :)
        </div>
    </div>
</template>

<script>
import { getEvent } from '@/services/app/event';
import { joinEvent } from '@/services/app/event';
import { updateNotification } from '@/services/app/notification';
import { useNotifications } from '@/store/notifications';
import { useUser } from '@/store/user';

export default {
    props: ["notification"],
    data() {
        return {
            isDisabled: false,
            userStore: useUser(),
            notificationsStore: useNotifications()
        }
    },
    methods: {
        enableButtons() {
            this.isDisabled = false
        },
        disableButtons() {
            this.isDisabled = true
        },
        getEvent() {
            const eID = this.notification.data.notification.eID
            return getEvent(eID)
        },
        addUserToEvent({ data: { general: { userPhotoURLs } } }) {
            const uID = this.notification.data.notification.uID
            const eID = this.notification.data.notification.eID
            const dateEnd = this.notification.data.notification.eDateEnd
            const photoURL = this.notification.data.notification.uPhotoURL
            return joinEvent(uID, eID, dateEnd, photoURL, userPhotoURLs)
        },
        updateNotification() {
            const nID = this.notification.nID
            const n = { "notification.isAnswered": true }
            return updateNotification(this.userStore.uID, nID, n)
        },
        updateLocalNotification() {
            const nID = this.notification.nID
            console.log(nID, this.notificationsStore.dict[nID])
            this.notificationsStore.dict[nID].data.notification.isAnswered = true
        },
        aprovalButton() {
            this.disableButtons()
            this.getEvent()
                .then(this.addUserToEvent)
                .then(this.updateNotification)
                .then(this.updateLocalNotification)
                .then(this.enableButtons)
        },
        refuseButton() {
            this.disableButtons()
            this.updateNotification()
                .then(this.updateLocalNotification)
                .then(this.enableButtons)
        }
    }
}
</script>