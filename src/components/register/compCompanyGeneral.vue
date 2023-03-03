<template>
    <div>
        <div>
            <p>İşletme İsmi</p>
            <q-input outlined placeholder="İşletme ismini giriniz" v-model="userStore.user.general.name" />
        </div>
        <div>
            <p>İşletme vergi numarası</p>
            <q-input outlined placeholder="İşletme vergi numarasını giriniz" v-model="userStore.company.general.taxID" />
        </div>
        <div>
            <p>Telefon Numarası</p>
            <q-input outlined v-model="userStore.user.account.phoneNumber" placeholder="Telefon numaranızı giriniz" mask="#"
                reverse-fill-mask prefix="+90" />
        </div>
        <div>
            <p>İşletme Konumu</p>
            <q-input outlined placeholder="İşletme konumunu şeçin" v-model="userStore.company.general.address" />
        </div>
    </div>
</template>
<script>
import { useUserRegister } from '@/store/user';
export default {
    props: ["page", "setPage"],
    data() {
        return {
            userStore: useUserRegister()
        }
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(0);
    }
}
</script>
<style>
.q-toggle__inner--falsy {
    color: rgb(250, 50, 0) !important;
}

.q-toggle__inner--truthy {
    color: rgb(0, 250, 150) !important;
}

.q-toggle__thumb {
    color: white !important;
}
</style>