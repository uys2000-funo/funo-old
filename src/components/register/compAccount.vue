<template>
    <div class="form">
        <div>
            <p>Kullanıcı Adı</p>
            <q-input outlined placeholder="Kullanıcı adınızı girin" v-model="userStore.user.general.nickName" />
        </div>
        <div>
            <p>Şifre</p>
            <q-input outlined placeholder="Şifrenizi giriniz" v-model="userStore.password" type="password"
                :rules="passRules" />
        </div>
        <div>
            <p class="q-mt-none">Şifre Tekrar</p>
            <q-input outlined placeholder="Lütfen şifrenizi tekrar   giriniz" v-model="userStore.password2" type="password"
                :rules="passRepeatRules" />
        </div>
        <div>
            <p class="q-mt-none">Mail</p>
            <q-input outlined placeholder="Mail adresinizi girin" v-model="userStore.user.account.mail"
                :rules="mailRules" />

        </div>
        <div class="q-mt-none">
            <q-checkbox v-model="userStore.agreement" label="Kullanıcı sözlemesini  okudum ve onaylıyorum" />
        </div>
    </div>
</template>
<script>
import { useUserRegister } from '@/store/user';

export default {
    props: ["page", "setPage"],
    data() {
        return {
            userStore: useUserRegister(),
            passRules: [
                val => val.length > 3 || 'Sence de şifre olmak için çok kısa değil mi',
            ],
            passRepeatRules: [
                val => val.length > 3 || 'Sence de şifre olmak için çok kısa değil mi',
                () => this.userStore.password == this.userStore.password2 || "Sanki şifreler aynı değil gibi",
            ],
            mailRules: [
                val => val.length > 3 || 'Sence de mail olmak için çok kısa değil mi',
                val => (val.lastIndexOf('@') != -1 && val.lastIndexOf('@') != val.length - 1) || "Bu mail mi emin miyiz",
                val => (val.lastIndexOf('.') != -1 && val.lastIndexOf('.') != val.length - 1) || "Az kaldı sanırsam",
            ]
        }
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(1);
    }
}
</script>