<template>
  <div class="column no-wrap justify-center items-center content-center montserrat"
    style="height:100vh; overflow: hidden;">
    <div class="column justify-center" style="height:70vw; max-height:40vh;flex-shrink: 0;">
      <compWheel :setR="setPageNumber" :pageNumber="pageNumber" />
    </div>
    <div class="full-width q-px-md" style="flex-grow: 1; overflow: auto; ">
      <router-view :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
    </div>
    <div class="full-width flex justify-center q-pb-md q-pt-xs">
      <div style="width:75%">
        <q-btn :disable="onProgress" class="fit bg-primary rounded" rounded @click="goNextPage">
          {{ this.pageNumber < 3 ? "Devam" : "Kaydol" }} </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import compWheel from '@/components/register/compWheel.vue';
import { createUser, createCompany, signOut } from '@/services/app/user';
import { showAlert } from '@/services/capacitor/dialog';
import { createUserAuth } from '@/services/firebase/authentication';
import { useUserRegister } from '@/store/user';
export default {
  components: { compWheel },
  data() {
    return {
      pageNumber: 0,
      userStore: useUserRegister(),
      onProgress: false
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
    checkPerson() {
      if (this.userStore.user.general.birthdate.seconds < -631245600) {
        this.pageNumber = 1
        return false
      }
      return true
    },
    checkCompany() {
      if (this.userStore.company.general.taxID.length < 3) {
        this.pageNumber = 1
        return false
      } else if (this.userStore.company.general.address.length < 3) {
        this.pageNumber = 1
        return false
      }
      return true

    },
    checkUser() {
      if (this.userStore.user.general.name.length < 3) {
        this.pageNumber = 1
        return false
      } else if (this.userStore.user.account.phoneNumber.length != 10) {
        this.pageNumber = 1
        return false
      } else if (this.userStore.user.general.nickName.length < 3) {
        this.pageNumber = 2
        return false
      } else if (this.userStore.password.length < 6) {
        this.pageNumber = 2
        return false
      } else if (this.userStore.password != this.userStore.password2) {
        this.pageNumber = 2
        return false
      } else if (this.userStore.user.account.mail.length < 3) {
        this.pageNumber = 2
        return false
      } else if (!this.userStore.agreement) {
        this.pageNumber = 2
        return false
      }
      if (this.userStore.user.account.isPerson)
        return this.checkPerson()
      return this.checkCompany()
    },
    registerUser() {
      const isPerson = this.userStore.user.account.isPerson
      if (this.checkUser()) {
        this.onProgress = true
        createUserAuth(this.userStore.user.account.mail, this.userStore.password)
          .then(({ user: { uid } }) => createUser(uid, this.userStore.user, this.userStore.photo)
            .then(() => isPerson ? true : createCompany(uid, this.userStore.company)))
          .then(() => this.succesfull())
          .catch(() => showAlert("Hata", "Mail adresi muhtemelen kullanımda :)"))
          .finally(() => this.onProgress = false)
      }
    },
    succesfull() {
      this.userStore.clear()
      signOut().catch().finally(() => {
        this.$router.push({ name: 'LoginPage' })
      })
    }
  },
  mounted() {
    if (this.$route.params.pID == "company")
      this.userStore.user.account.isPerson = false
    else this.$router.replace("/register/personnel")
  }
}
</script>
<style>
p {
  margin: 20px 0 0 0;
}
</style>