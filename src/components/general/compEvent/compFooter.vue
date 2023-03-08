<template>
    <div class="q-px-sm">
        <div class="full-width row no-wrap">
            <div class="col-4 row no-wrap items-center">
                <q-icon size="md" name="calendar_month" color="accent" />
                <div>
                    {{ startTime }} - {{ endTime }}
                    <q-tooltip :hide-delay="5000">
                        <table>
                            <tr>
                                <td class="q-pr-sm">Başlangıç: </td>
                                <td>{{ startDate }} - {{ startTime }}</td>
                            </tr>
                            <tr>
                                <td>Bitiş: </td>
                                <td>{{ endDate }} - {{ endTime }}</td>
                            </tr>
                        </table>
                    </q-tooltip>
                </div>
            </div>
            <div class="col-4 row no-wrap items-center justify-center" style="flex-grow: 1;">
                <template v-if="event.data.conditions.price != 0">
                    <q-icon size="md" name="local_activity" color="accent" />
                    <div class="text-caption">
                        {{ event.data.conditions.price }} ₺
                    </div>
                </template>
            </div>
            <div class="col-4 row no-wrap items-center justify-end q-pr-sm">
                <comp-participants :userPhotoURLs="event.data.general.userPhotoURLs" />
            </div>
        </div>
        <div class="full-width row no-wrap">
            <div class="col-4 row no-wrap items-center">
                <q-icon size="md" name="location_on" color="accent" />
                <div class="text-caption t">
                    {{ location }}
                </div>
                <q-tooltip :hide-delay="5000">
                    <div>
                        <div>
                            {{ event.data.location.text }}
                        </div>
                        <div>
                            {{ event.data.location.description }}

                        </div>
                    </div>
                </q-tooltip>
            </div>
            <div class="col-4 text-center">
                <q-btn :disable="(!state && !limit) || isDisabled" rounded class="bg-primary text-white"
                    style="flex-grow: 1;" @click="buttonEvent">
                    <span class="text-weight-bolder text-bold">
                        {{ state ? "Vazgeç" : !limit ? "Dolu" : type ? "Sor" : "Katıl" }}
                    </span>
                </q-btn>
                <q-tooltip :hide-delay="5000" v-if="!state && !limit">
                    <div>
                        Malesef ki limit {{ this.event.data.conditions.userLimit }} kişiydi ve
                        {{ this.event.data.count?.joinEvent }} kişi bulunmakta :'( sayfayı yebileyip
                        tekrar kontrol edebilirsin :)
                    </div>
                </q-tooltip>
            </div>
            <q-btn clas dense flat no-caps class="w col-4" align="right" @click="toEvent">
                Dahası
            </q-btn>
        </div>
    </div>
</template>
<script>
import { exitEvent, joinEvent } from '@/services/app/event';
import { useEvent, useEvents } from '@/store/event.js';
import { useUser } from '@/store/user';
import compParticipants from './compParticipants.vue';
import { sendNotification } from '@/services/app/notification';
import { showToast } from '@/services/capacitor/toast';
export default {
    components: { compParticipants },
    props: ["event"],
    data() {
        return {
            userStore: useUser(),
            eventSoter: useEvent(),
            eventsStore: useEvents(),
            isDisabled: false
        }
    },
    methods: {
        buttonEvent() {
            if (this.state) this.exitEvent()
            else if (this.type) this.requestJoinEvent()
            else this.joinEvent()
        },
        checkLimit() {
        },
        requestJoinEvent() {
            console.log(this.event)
            this.isDisabled = true;
            const notification = {
                type: "request",
                eID: this.event.eID,
                eName: this.event.data.general.name,
                eDateEnd: this.event.data.date.end,
                uID: this.userStore.uID,
                uName: this.userStore.nickName,
                uPhotoURL: this.userStore.photoURL,
                isAnswered: false
            }
            sendNotification(this.event.data.owner.uID, this.userStore.uID, notification).then(() => {
                showToast("İstek Başarı ile gönderildi")
                this.isDisabled = false
            })
        },
        joinEvent() {
            this.isDisabled = true;
            const photoURL = this.userStore.user.userFire.settings.isHidden ? false : this.userStore.user.userFire.account.photoURL
            joinEvent(this.userStore.uID, this.event.eID, this.event.data.date.end, photoURL, this.event.data.general.userPhotoURLs).then(() => this.isDisabled = false)
            this.eventsStore.dict[this.event.eID].data.count.joinEvent++
        },
        exitEvent() {
            this.isDisabled = true;
            const photoURL = this.userStore.user.userFire.settings.isHidden ? true : this.userStore.user.userFire.account.photoURL
            const dID = this.event.joined?.dID
            exitEvent(this.userStore.uID, this.event.eID, dID, photoURL, this.event.data.general.userPhotoURLs).then(() => this.isDisabled = false)
            this.eventsStore.dict[this.event.eID].data.count.joinEvent--
        },
        toEvent() {
            this.eventSoter.event = this.event
            this.$router.push({ name: "EventPage", params: { eID: this.event.eID } })
        }
    },
    mounted() {
        this.checkLimit()
    },
    computed: {
        type() {
            return this.event.data.conditions.approval
        },
        state() {
            if (this.event.joined?.data?.isJoining) return true
            return false
        },
        limit() {
            if (this.event.data.conditions.userLimit == 0) return true
            if (!this.event.data.count?.joinEvent) return true
            else if (this.event.data.count?.joinEvent < this.event.data.conditions.userLimit) return true
            else return false
        },
        startDate() {
            const date = new Date(this.event.data.date.start.seconds * 1000);
            return date.toLocaleDateString("tr-TR")
        },
        endDate() {
            const date = new Date(this.event.data.date.end.seconds * 1000);
            return date.toLocaleDateString("tr-TR")
        },
        startTime() {
            const date = new Date(this.event.data.date.start.seconds * 1000);
            return date.toLocaleTimeString("tr-TR").split(":").splice(0, 2).join(":")
        },
        endTime() {
            const date = new Date(this.event.data.date.end.seconds * 1000);
            return date.toLocaleTimeString("tr-TR").split(":").splice(0, 2).join(":")
        },
        location() {
            if (this.event.data.location.isOnline) return this.event.data.location.text
            const location = this.event.data.location.text.split(",")
            const end = location.length - 1
            const start = Math.round(end / 2)
            return location.slice(start, end).join(", ")
        }
    }
}
</script>
<style>
.t {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>