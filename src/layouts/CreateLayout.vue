<template>
  <router-view v-slot="{ Component }">
    <comp-popup fullscreen v-if="show">
      <back-button />
      <div class="fit column no-wrap justify-center items-center content-center" style="overflow: hidden;">
        <div>
          <div class="q-pt-md q-pb-md text-h5 text-center">
            {{ pageNumber == 0 ? "Temel Bilgiler" :
              pageNumber == 1 ? "Tarih & Kitle" :
                pageNumber == 2 ? "Konum & Fiyat" : "Görseller" }}
          </div>
          <div class="column justify-center q-mb-xs" style="height:60vw; max-height:30vh;">
            <comp-wheel :setR="setPageNumber" :pageNumber="pageNumber" />
          </div>
        </div>
        <div class="full-width" style="flex-grow: 1; overflow: auto; ">
          <div class="fit" style="overflow: auto;">
            <component :is="Component" :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
          </div>
        </div>
        <div class="full-width flex justify-center q-pb-md q-pt-xs">
          <div style="width:75%">
            <q-btn class="fit bg-primary rounded" rounded @click="goNextPage">
              {{ this.pageNumber < 3 ? "Devam" : $route.params.eID ? "Güncelle" : "Oluştur" }} </q-btn>
          </div>
        </div>
      </div>
    </comp-popup>
  </router-view>
</template>
<script>
import compPopup from '@/components/general/compPopup.vue';
import backButton from '@/components/general/backButton.vue';
import compWheel from '@/components/create/compWheel.vue';
import { useUser } from '@/store/user';
import { useEvent } from '@/store/event.js';
import { createEvent, getEvent, updateEvent } from '@/services/app/event';
export default {
  components: { compPopup, backButton, compWheel },
  data() {
    return {
      userStore: useUser(),
      eventStore: useEvent(),
      pageName: "",
      pageNumber: 0,
      show: false,
    }
  },
  methods: {
    isEditPage() {
      if (this.$route.params.eID) return true
      else return false
    },
    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
    },
    goNextPage() {
      if (this.pageNumber < 3)
        this.pageNumber = this.pageNumber + 1
      else this.isEditPage() ? this.updateEvent() : this.createEvent()
    },
    updateEvent() {
      updateEvent(this.userStore.uID, this.eventStore.event.data, this.eventStore.images)
        .then(() => {
          this.$router.push({ name: "EventsPage" })
          this.eventStore.clear()
        })
    },
    createEvent() {
      createEvent(this.userStore.uID, this.eventStore.event.data, this.eventStore.images)
        .then(() => {
          this.$router.push({ name: "EventsPage" })
          this.eventStore.clear()
        })
    },

    loadEvent() {
      return getEvent(this.$route.params.eID)
        .then(({ data: event }) => {
          this.eventStore.event = { eID: this.$route.params.eID, data: event }
          this.eventStore.event.data.general.photoURLs.forEach(url => {
            this.eventStore.imageURLs.push(url)
            this.eventStore.images.push(false)
          });
          this.show = true
        })
    },
    loadUser() {
      this.eventStore.event.data.owner.isPerson = this.userStore.isPerson
      this.eventStore.event.data.owner.nickName = this.userStore.nickName
      this.eventStore.event.data.owner.uID = this.userStore.uID
      this.eventStore.event.data.owner.photoURL = this.userStore.user.userFire.account.photoURL
    },
  },
  mounted() {
    if (this.isEditPage()) this.loadEvent().then(() => this.loadUser())
    else { this.loadUser(); this.show = true }

  }
}
</script>