<template>
    <q-scroll-area class="fit q-py-md">
        <q-list separator>
            <q-item>
                <q-item-section avatar>
                    <q-icon color="primary" name="lock" />
                </q-item-section>
                <q-item-section>Hesabı gizle</q-item-section>
                <q-item-section avatar>
                    <q-toggle @click="onUpdate" v-model="isHidden" />
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar>
                    <q-icon color="primary" name="comment" />
                </q-item-section>
                <q-item-section>Mesaj İzni</q-item-section>
                <q-item-section avatar>
                    <q-toggle @click="onUpdate" v-model="isReceivable" />
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="openPassword">
                <q-item-section avatar>
                    <q-icon color="primary" name="key" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Parola Değiştirme</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="openAbout">
                <q-item-section avatar>
                    <q-icon color="primary" name="info" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Hakkımızda</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="openHelp">
                <q-item-section avatar>
                    <q-icon color="primary" name="help" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Yardım</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="exit">
                <q-item-section avatar>
                    <q-icon color="primary" name="power_settings_new" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Çıkış</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-scroll-area>
</template>
<script>
import { signOut } from '@/services/app/auth';
import { updateUserData } from '@/services/app/user';
import { showToast } from '@/services/capacitor/toast';
import { useUser } from '@/store/user';

export default {
    props: ["setPage"],
    data() {
        return {
            userStore: useUser(),
            isHidden: false,
            isReceivable: false
        }
    },
    methods: {
        onUpdate() {
            console.log(
                this.isHidden,
                this.isReceivable,
            )
            this.userStore.user.userFire.settings.isHidden = this.isHidden;
            this.userStore.user.userFire.settings.isReceivable = this.isReceivable;
            updateUserData(this.userStore.uID,
                { "settings.isHidden": this.isHidden, "settings.isReceivable": this.isReceivable })
                .then(() => showToast("Başarıyla Güncellendi"))
                .catch(() => showToast("Bir Şeyler Yanlış Gitii"))
        },
        openPassword() {
            this.setPage("password")
        },
        openAbout() {
            this.setPage("about")
        },
        openHelp() {
            this.setPage("help")
        },
        exit() {
            signOut()
                .then(() => this.userStore.clear())
                .then(() => this.$router.push({ name: "LoginPage" }))
        }
    }, mounted() {
        this.isHidden = this.userStore.user.userFire.settings.isHidden
        this.isReceivable = this.userStore.user.userFire.settings.isReceivable
    }
}
</script>