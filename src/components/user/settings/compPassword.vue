<template>
    <q-scroll-area class="fit q-px-xl q-py-md">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="oldPassword" label="Eski Şifre" />

            <q-input filled v-model="newPassword" label="Yeni Şifre" />
            <q-input filled v-model="newPasswordConfirm" label="Yeni Şifre Tekrar" />

            <div class=" row no-wrap q-px-sm q-pb-sm">
                <q-btn class="full-width" label="Kaaydet" type="submit" color="primary" />
                <q-btn class="full-width" label="Vazgeç" type="reset" color="primary" flat />
            </div>
        </q-form>
    </q-scroll-area>
</template>
<script>
import { updatePassword } from '@/services/app/user'
import { showToast } from '@/services/capacitor/toast'
import { user } from '@/store/user'

export default {
    props: ["setPage"],
    data() {
        return {
            user: user(),
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        }
    },
    methods: {
        onSubmit() {
            if (this.newPassword == this.newPasswordConfirm)
                updatePassword(
                    this.user.user.userAuth.email,
                    this.oldPassword,
                    this.newPassword)
                    .then(() => showToast("Başarıyla Güncellendi"))
                    .then(() => this.setPage("list"))
                    .catch(() => showToast("Bir Şeyler Yanlış Gitii"))
        },
        onReset() {
            this.oldPassword = ""
            this.newPassword = ""
            this.newPasswordConfirm = ""
            this.setPage("list")
        }
    }
}
</script>