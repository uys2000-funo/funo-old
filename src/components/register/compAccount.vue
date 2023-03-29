<template>
    <div class="form">
        <div>
            <p>Kullanıcı Adı</p>
            <q-input outlined placeholder="Kullanıcı adınızı girin" v-model="userStore.user.general.nickName" />
        </div>
        <div>
            <p>Şifre</p>
            <q-input outlined placeholder="Şİfrenizi giriniz" v-model="userStore.password" />
        </div>
        <div>
            <p>Şifre Tekrar</p>
            <q-input outlined placeholder="Şİfrenizi giriniz" v-model="userStore.password2" />
        </div>
        <div>
            <p>Mail</p>
            <q-input outlined placeholder="Mail adresinizi girin" v-model="userStore.user.account.mail" />
        </div>
        <div>
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
        }
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(1);
    }
}
</script>