<template>
    <div class="q-px-sm">
        <div class="full-width row no-wrap">
            <div class="w row no-wrap items-center">
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
            <div class="row no-wrap items-center justify-center" style="flex-grow: 1;">
                <template v-if="event.conditions.price != 0">
                    <q-icon size="md" name="local_activity" color="accent" />
                    <div class="text-caption">
                        {{ event.conditions.price }} ₺
                    </div>
                </template>
            </div>
            <div class="w row no-wrap items-center justify-end">
                <div class="text-right row items-center">
                    <div class="">
                        Katılımcılar
                    </div>
                    <q-avatar size="md" class="bg-white q-ml-sm">
                        <q-icon size="md" name="person" color="accent" />
                    </q-avatar>
                </div>
            </div>
        </div>
        <div class="full-width row no-wrap">
            <div class="w row no-wrap items-center q-pr-sm">
                <q-icon size="md" name="location_on" color="accent" />
                <div class="text-caption t">
                    {{ location }}
                </div>
                <q-tooltip :hide-delay="5000">
                    <div>
                        <div>
                            {{ event.location.text }}
                        </div>
                        <div>
                            {{ event.location.description }}

                        </div>
                    </div>
                </q-tooltip>
            </div>
            <q-btn rounded class="bg-primary text-white" style="flex-grow: 1;" @click="buttonEvent">
                <span class="text-weight-bolder text-bold">
                    {{ state ? "Vazgeç" : "Katıl" }}
                </span>
            </q-btn>
            <div class="w row no-wrap items-center justify-end">
                <div class="text-caption t">
                    Dahası...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { exitEvent, joinEvent } from '@/services/app/event';
import { events } from '@/store/events';
import { user } from '@/store/user';

export default {
    props: ["event"],
    data() {
        return {
            user: user(),
            events: events(),
        }
    },
    methods: {
        buttonEvent() {
            if (this.state) this.exitEvent()
            else this.joinEvent()
        },
        joinEvent() {
            joinEvent(this.event.eID, this.user.uID)
        },
        exitEvent() {
            exitEvent(this.event.eID, this.user.uID)
        },
    },
    computed: {
        state() {
            return this.events.joinedEvents[this.event.eID]
        },
        startDate() {
            const date = new Date(this.event.date.start.seconds * 1000);
            return date.toLocaleDateString("tr-TR")
        },
        endDate() {
            const date = new Date(this.event.date.end.seconds * 1000);
            return date.toLocaleDateString("tr-TR")
        },
        startTime() {
            const date = new Date(this.event.date.start.seconds * 1000);
            return date.toLocaleTimeString("tr-TR").split(":").splice(0, 2).join(":")
        },
        endTime() {
            const date = new Date(this.event.date.end.seconds * 1000);
            return date.toLocaleTimeString("tr-TR").split(":").splice(0, 2).join(":")
        },
        location() {
            if (this.event.location.isOnline) return this.event.location.text
            const location = this.event.location.text.split(",")
            const end = location.length - 1
            const start = Math.round(end / 2)
            return location.slice(start, end).join(", ")
        }
    }
}
</script>
<style>
.w {
    width: 40%;
}

.t {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>