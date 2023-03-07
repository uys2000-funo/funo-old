<template>
    <div class="fit">
        <div class="text-primary row justify-around">
            <q-btn flat dense round>
                <q-avatar>
                    <q-icon name="phone_in_talk" />
                </q-avatar>
            </q-btn>
            <q-btn flat dense round>
                <q-avatar>
                    <q-icon name="location_on" />
                </q-avatar>
            </q-btn>
            <q-btn flat dense round>
                <q-avatar class="route">
                    <q-icon name="send" />
                </q-avatar>
            </q-btn>
            <q-btn flat dense round>
                <q-avatar>
                    <q-icon name="share" />
                </q-avatar>
            </q-btn>
            <q-btn flat>
                Takip Et
            </q-btn>
        </div>
        <div class="row">
            <table class="full-width">
                <tr>
                    <td></td>
                    <td class="text-center"><q-icon color="primary" size="md" name="calendar_month" /></td>
                    <td class="text-center"><q-icon color="primary" size="md" name="schedule" /></td>
                </tr>
                <tr>
                    <td>Başlangıç</td>
                    <td class="q-px-xs text-center">{{ startDate }}</td>
                    <td class="q-px-xs text-center">{{ startTime }}</td>
                </tr>
                <tr>
                    <td>Bitiş</td>
                    <td class="q-px-xs text-center">{{ endDate }}</td>
                    <td class="q-px-xs text-center">{{ endTime }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="text-center"><q-icon color="primary" size="md" name="elderly" /></td>
                    <td class="text-center"><q-icon color="primary" size="md" name="girl" /></td>
                </tr>
                <tr>
                    <td>Yaş Aralığı</td>
                    <td class="text-center">{{ eventStore.event.data.conditions.age.min }}</td>
                    <td class="text-center">{{ eventStore.event.data.conditions.age.max }}</td>
                </tr>
                <tr>
                    <td>Ücret</td>
                    <td class="text-center">{{ eventStore.event.data.conditions.age.min }}</td>
                    <td class="text-center"><q-icon class="text-primary" size="md" name="confirmation_number" /></td>
                </tr>
            </table>
            <div >
                <q-icon size="md" name="location_on" color="primary" class="float-left" />
                <span class="q-ma-auto">
                    Adres :{{ eventStore.event.data.location.text }}
                </span>
            </div>
            <div >
                <q-icon size="md" name="tag" color="primary" class="float-left" />
                <span class="q-ma-auto">
                    Açıklama :{{ eventStore.event.data.general.description }}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { useEvent } from '@/store/event';

export default {
    data() {
        return {
            eventStore: useEvent(),
        }
    },
    computed: {
        startDate() {
            if (this.eventStore.event.data?.date.start) return new Date(this.eventStore.event.data.date.start.seconds * 1000).toLocaleDateString("tr-TR")
            else return "00.00.0000"
        },
        startTime() {
            if (this.eventStore.event.data?.date.start) return new Date(this.eventStore.event.data.date.start.seconds * 1000).toLocaleTimeString("tr-TR")
            else return "00.00.0000"
        },
        endDate() {
            if (this.eventStore.event.data?.date.end) return new Date(this.eventStore.event.data.date.end.seconds * 1000).toLocaleDateString("tr-TR")
            else return "00.00.0000"
        },
        endTime() {
            if (this.eventStore.event.data?.date.end) return new Date(this.eventStore.event.data.date.end.seconds * 1000).toLocaleTimeString("tr-TR")
            else return "00.00.0000"
        }
    }
}
</script>

<style scoped>
.route {
    transform: translate(10%, -10%) rotate(-45deg);
}
</style>