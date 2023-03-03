<template>
    <q-scroll-area class="fit q-px-xl q-py-md">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="edit.userName" label="Kullanıcı Adı" />
            <q-input filled v-model="edit.name" label="İsim" />

            <q-input filled v-model="edit.phoneNumber" label="Telefon Numarası" type="number" />
            <q-input filled v-model="edit.mail" label="Mail Adresi" />
            <q-input filled v-model="edit.birthdate" label="Doğum Tarihi" />

            <div class=" row no-wrap q-px-sm q-pb-sm">
                <q-btn class="full-width" label="Kaydet" type="submit" color="primary" />
                <q-btn class="full-width" label="Vazgeç" type="reset" color="primary" flat />
            </div>
        </q-form>
    </q-scroll-area>
</template>

<script>
import { updateUser } from '@/services/app/user';
import { showToast } from '@/services/capacitor/toast';
import { user } from '@/store/user';


export default {
    data() {
        return {
            user: user(),
            edit: {
                userName: "",
                name: "",
                phoneNumber: "",
                mail: "",
                birthdate: "",
            }
        }
    },
    methods: {
        onSubmit() {
            updateUser(this.user.uID, this.edit)
                .then(() => showToast("Başarıyla Güncellendi"))
                .then(() => {
                    this.user.user.userFire.userName = this.edit.userName
                    this.user.user.userFire.name = this.edit.name
                    this.user.user.userFire.phoneNumber = this.edit.phoneNumber
                    this.user.user.userFire.mail = this.edit.mail
                    this.user.user.userFire.birthdate = this.edit.birthdate
                })
                .catch(() => showToast("Bir Şeyler Yanlış Gitii"))
        },
        onReset() {
            this.edit.userName = this.user.user.userFire.userName
            this.edit.name = this.user.user.userFire.name
            this.edit.phoneNumber = this.user.user.userFire.phoneNumber
            this.edit.mail = this.user.user.userFire.mail
            this.edit.birthdate = this.user.user.userFire.birthdate
        }
    },
    mounted() {
        this.onReset()
    }
}
</script>