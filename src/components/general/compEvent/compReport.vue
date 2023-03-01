<template>
    <div class="full-width row justify-around" style="height:35vw">
        <q-form @submit="onSubmit" class="fit q-gutter-md overflow-auto">
            <div class="row no-wrap">
                <q-select dense v-model="report.reason" label="Sebep" filled :options="options" class="full-width" />
                <q-btn dense label="Submit" type="submit" color="primary" class="q-mx-sm" />
            </div>
            <q-input dense v-model="report.explanation" bordered label="Açıklama" type="textarea" />
        </q-form>
    </div>
</template>
<script>
import { reportEvent } from "@/services/app/event"
import { user } from "@/store/user";
export default {
    props: ["openSettings", "event"],
    data() {
        return {
            user: user(),
            report: {
                eID: "",
                oID: "",
                uID: "",
                reason: "",
                explanation: ""
            },
            options: ["Uygunsuz Dçerik", "Dolandırıcılık",
            ],

        }
    },
    methods: {
        onSubmit() {
            reportEvent(this.event.eID, this.report).then(() => this.openSettings())
        }
    },
    mounted() {
        this.report.uID = this.user.uID;
        this.report.eID = this.event.eID;
        this.report.oID = this.event.general.oID;
    }
}
</script>