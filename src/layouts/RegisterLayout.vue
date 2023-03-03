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
import { isValidUser, registerUser } from "@/services/app/register"
import { showAlert } from '@/services/capacitor/dialog';
import { register } from '@/store/register';
import { user } from '@/store/user';
export default {
  components: { compWheel },
  data() {
    return {
      pageNumber: 0,
      register: register(),
      user: user(),
    }
  },
  methods: {
    loadUser() {
      const data = this.user.user.userAuth.providerData[0]
      this.register.user.name = data.displayName
      this.register.user.mail = data.email
    },
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
        .then(() => registerUser(user, this.register.pass, this.register.profileImage))
        .then(() => this.$router.push({ name: "Login" }))
    }
  },
  mounted() {
    if (!this.$route.params.pID)
      this.$router.replace("/register/profile")
    else if (this.$route.params.pID == "company")
      this.register.user.type = false
    this.loadUser()
  }
}
</script>