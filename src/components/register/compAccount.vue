<template>
    <div>
        <div>
            <p>Kullanıcı Adı</p>
            <q-input outlined placeholder="Kullanıcı adınızı girin" v-model="register.user.userName" />
        </div>
        <div>
            <p>Şifre</p>
            <q-input outlined placeholder="Şİfrenizi giriniz" v-model="register.pass" />
        </div>
        <div>
            <p>Mail</p>
            <q-input outlined placeholder="Mail adresinizi girin" v-model="register.user.mail" />
        </div>
        <div>
            <q-checkbox v-model="register.agreement" label="Kullanıcı sözlemesini  okudum ve onaylıyorum" />
        </div>
    </div>
</template>
<script>
import { register } from '@/store/register';

export default {
    props: ["page", "setPage"],
    data() {
        return {
            register: register(),
        }
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(1);
    }
}
</script>