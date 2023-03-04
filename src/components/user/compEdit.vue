<template>
    <q-scroll-area class="fit q-px-xl q-py-md">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="edit['general.nickName']" label="Kullanıcı Adı" />
            <q-input filled v-model="edit['general.name']" label="İsim" />

            <q-input filled v-model="edit['account.phoneNumber']" label="Telefon Numarası" type="number" />
            <q-input filled v-model="edit['account.mail']" label="Mail Adresi" />

            <div class=" row no-wrap q-px-sm q-pb-sm">
                <q-btn class="full-width" label="Kaydet" type="submit" color="primary" />
                <q-btn class="full-width" label="Vazgeç" type="reset" color="primary" flat />
            </div>
        </q-form>
    </q-scroll-area>
</template>

<script>
import { updateUserData } from '@/services/app/user';
import { showToast } from '@/services/capacitor/toast';
import { useUser } from '@/store/user';


export default {
    data() {
        return {
            userStore: useUser(),
            edit: {
                "general.nickName": "",
                "general.name": "",
                "account.phoneNumber": "",
                "account.mail": "",
            }
        }
    },
    methods: {
        onSubmit() {
            updateUserData(this.userStore.uID, this.edit)
                .then(() => showToast("Başarıyla Güncellendi"))
                .then(() => {
                    this.userStore.user.userFire.general.nickName = this.edit["general.nickName"]
                    this.userStore.user.userFire.general.name = this.edit.general["general.name"]
                    this.userStore.user.userFire.account.phoneNumber = this.edit.account["account.phoneNumber"]
                    this.userStore.user.userFire.account.mail = this.edit.account["account.mail"]
                })
                .catch(() => showToast("Bir Şeyler Yanlış Gitii"))
        },
        onReset() {
            this.edit["general.nickName"] = this.userStore.user.userFire.general.nickName
            this.edit["general.name"] = this.userStore.user.userFire.general.name
            this.edit["account.phoneNumber"] = this.userStore.user.userFire.account.phoneNumber
            this.edit["account.mail"] = this.userStore.user.userFire.account.mail
        }
    },
    mounted() {
        this.onReset()
    }
}
</script>