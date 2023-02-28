<template>
    <div>
        <div>
            <p>Ad Soyad</p>
            <q-input outlined placeholder="Adınızı ve sosyadınızı giriniz" v-model="register.user.name"
                :rules="nameRules" />
        </div>
        <div>
            <p>Doğum Tarihi</p>
            <q-input outlined placeholder="Doğum tarihinizi  seçiniz" v-model="register.userPerson.birthdate"
                mask="##/##/####" :rules="birthdateRules">
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
                v-model="register.user.phoneNumber" :rules="phoneRules" />
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
            register: register(),
            nameRules: [
                val => val.length > 3 || 'Sence de isim olmak için çok kısa değil mi',
                val => val.lastIndexOf(' ') != val.length - 1 && val.indexOf(' ') != 0 && val.indexOf(' ') != -1 || 'İsim ve Soyisim şeklinde girebilirsen çok harika olur :)',
                val => val.lastIndexOf('  ') == -1 || "Şey şey yan yana neden iki boşluk var :)",
            ],
            birthdateRules: [
                val => val.length > 9 || 'Daha tamamını girmedin sanırsam :)',
            ],
            phoneRules: [
                val => val.length > 9 || 'Daha tamamını girmedin sanırsam :)',
                val => val.length < 11 || 'Şey şey bi uzunoldu sanki :)',
            ]
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