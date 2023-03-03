<template>
    <q-scroll-area class="fit q-py-md">
        <q-list separator>
            <q-item>
                <q-item-section avatar>
                    <q-icon color="primary" name="lock" />
                </q-item-section>
                <q-item-section>Hesabı gizle</q-item-section>
                <q-item-section avatar>
                    <q-toggle @update:model-value="onUpdate" v-model="isHidden" />
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
import { updateUser } from '@/services/app/user';
import { showToast } from '@/services/capacitor/toast';
import { user } from '@/store/user';

export default {
    props: ["setPage"],
    data() {
        return {
            user: user(),
            isHidden: false
        }
    },
    methods: {
        onUpdate() {
            this.user.user.userFire.isHidden = this.isHidden;
            updateUser(this.user.uID, { isHidden: !this.isHidden })
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
            signOut().then(() => this.$router.push({ name: "LoginPage" }))
        }
    }, mounted() {
        this.isHidden = this.user.user.userFire.isHidden;
    }
}
</script>