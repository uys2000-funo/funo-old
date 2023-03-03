<template>
    <div>
        <div>
            <p>Ad Soyad</p>
            <q-input outlined placeholder="Adınızı ve sosyadınızı giriniz" v-model="userStore.user.general.name"
                :rules="nameRules" />
        </div>
        <div>
            <p>Doğum Tarihi</p>
            <q-input outlined placeholder="Doğum tarihinizi  seçiniz" v-model="date" mask="##.##.####"
                :rules="birthdateRules">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer text-primary">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date" mask="DD.MM.YYYY">
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
                v-model="userStore.user.account.phoneNumber" :rules="phoneRules" />
        </div>
        <div class="row no-wrap justify-around items-center content-center">
            <div class="col-5">Cinsiyet</div>
            <div class="col-7 column no-wrap justify-around items-center content-center">
                <div>
                    <q-toggle size="8vh" v-model="userStore.user.general.gender" color="orange" keep-color />
                </div>
                <div>Kadın / Erkek</div>
            </div>
        </div>
    </div>
</template>
<script>
import { timestampMillis } from '@/services/firebase/firestore';
import { useUserRegister } from '@/store/user';
export default {
    props: ["page", "setPage"],
    data() {
        return {
            date: new Date().toLocaleDateString("tr-TR"),

            userStore: useUserRegister(),
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
    methods: {
        setupDate() {
            const date = new Date(this.userStore.user.general.birthdate.seconds * 1000);
            this.date = date.toLocaleDateString("tr-TR");
        },
        updateDate() {
            if (this.date) {
                const date = this.date.split(".");
                const d = new Date(date[2], date[1] - 1, date[0]).getTime()
                this.userStore.user.general.birthdate = timestampMillis(d);
            }
        }
    },

    watch: {
        date() {
            this.updateDate()
        }
    },
    mounted() {
        if (this.userStore.user.general.birthdate != 0) {
            this.setupDate()
        }
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