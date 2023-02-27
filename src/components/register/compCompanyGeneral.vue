<template>
    <div>
        <div>
            <p>İşletme İsmi</p>
            <q-input outlined placeholder="İşletme ismini giriniz" v-model="register.user.name" />
        </div>
        <div>
            <p>İşletme vergi numarası</p>
            <q-input outlined placeholder="İşletme vergi numarasını giriniz" v-model="register.userCompany.taxNumber" />
        </div>
        <div>
            <p>Telefon Numarası</p>
            <q-input outlined v-model="register.user.phoneNumber" placeholder="Telefon numaranızı giriniz" mask="#"
                reverse-fill-mask prefix="+90" />
        </div>
        <div>
            <p>İşletme Konumu</p>
            <q-input outlined placeholder="İşletme konumunu şeçin" v-model="register.userCompany.companyAdress" />
        </div>
    </div>
</template>
<script>
import { register } from '@/store/register';
export default {
    props: ["page", "setPage"],
    data() {
        return {
            register: register()
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