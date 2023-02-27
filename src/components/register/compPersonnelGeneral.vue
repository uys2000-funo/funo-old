<template>
    <div>
        <div>
            <p>Ad Soyad</p>
            <q-input outlined placeholder="Adınızı ve sosyadınızı giriniz" v-model="register.user.name" />
        </div>
        <div>
            <p>Doğum Tarihi</p>
            <q-input outlined placeholder="Doğum tarihinizi  seçiniz" v-model="register.userPerson.birthdate"
                mask="##/##/####">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer text-primary">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="register.userPerson.birthdate" mask="DD/MM/YYYY">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>
        <div>
            <p>Telefon Numarası</p>
            <q-input outlined placeholder="Telefon numaranızı giriniz" mask="#" reverse-fill-mask prefix="+90"
                v-model="register.user.phoneNumber" />
        </div>
        <div class="row no-wrap justify-around items-center content-center">
            <div class="col-5">Cinsiyet</div>
            <div class="col-7 column no-wrap justify-around items-center content-center">
                <div>
                    <q-toggle size="8vh" v-model="register.userPerson.sex" color="orange" keep-color />
                </div>
                <div>Kadın / Erkek</div>
            </div>
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
}</style>