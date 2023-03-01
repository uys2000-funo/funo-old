<template>
  <div class="column no-wrap justify-center items-center content-center" style="height:100vh; overflow: hidden;">
    <div class="column justify-center" style="height:70vw; max-height:40vh;flex-shrink: 0;">
      <compWheel :setR="setPageNumber" :pageNumber="pageNumber" />
    </div>
    <div class="full-width" style="flex-grow: 1; overflow: auto; ">
      <router-view :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
    </div>
    <div class="full-width flex justify-center q-pb-md q-pt-xs">
          <div style="width:75%">
            <q-btn class="fit bg-primary rounded" rounded @click="goNextPage">
              {{ this.pageNumber < 3 ? "Devam" : "Kaydol" }} </q-btn>
          </div>
        </div>
  </div>
</template>
<script>
import compWheel from '@/components/register/compWheel.vue';
import { isValidUser, registerUser, uploadProfileImage } from "@/services/app/register"
import { showAlert } from '@/services/capacitor/dialog';
import { register } from '@/store/register';
export default {
  components: { compWheel },
  data() {
    return {
      pageNumber: 0,
      register: register(),
    }
  },
  methods: {
    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
    },
    goNextPage() {
      if (this.pageNumber < 3)
        this.pageNumber = this.pageNumber + 1
      else this.registerUser()
    },
    registerUser() {
      let user;
      if (this.register.user.type) user = { ...this.register.user, ...this.register.userPerson }
      else user = { ...this.register.user, ...this.register.userCompany }
      if (!this.register.agreement) showAlert("Hata", "Kullanıcı Sözleşmesini Kabul Etmelisiniz :)")
      else isValidUser(user)
        .catch(() => showAlert("Hata", "Lütfen Eksik Bilgileri Tamamlayarak Tekrar Deneyin"))
        .then(() => {
          registerUser(user, this.register.pass)
            .catch(err => {
              if (err.code == "auth/invalid-email") showAlert("Hata", "Geçersiz Eposta Adresi")
              if (err.code == "auth/weak-password") showAlert("Hata", "Zayıf Şifre")
              if (err.code == "auth/email-already-in-use") showAlert("Hata", "Eposta Adresi Kullanımda")
              else console.log(err.code)
            }).then((uID) => {
              if (this.register.profileImage) uploadProfileImage(uID, this.register.profileImage)
            }).then(() => showAlert("Başarılı", "Hesap Oluşturuldu Artık giriş Yapabilirsiniz"))
            .then(() => this.$router.push({ name: "Login" }))
        })
    }
  },
  mounted() {
    if (this.$route.params.pID == "company")
      this.register.user.type = false
    else this.$router.push("/register/personnel")
  }
}
</script>