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
import { useEvent } from '@/store/event.js';
import { useUser } from '@/store/user';
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
    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
    },
    updateEvent() {
      updateEvent(this.userStore.uID, this.eventStore.event, this.eventStore.images)
        .then(() => {
          this.$router.push({ name: "EventsPage" })
          this.eventStore.clear()
        })
    },
    createEvent() {
      createEvent(this.userStore.uID, this.eventStore.event, this.eventStore.images)
        .then(() => {
          this.$router.push({ name: "EventsPage" })
          this.eventStore.clear()
        })
    },
    goNextPage() {
      if (this.pageNumber < 3)
        this.pageNumber = this.pageNumber + 1
      else if (this.$route.params.eID) this.updateEvent()
      else this.createEvent();

    },
    checkLoad() {
      if (this.$route.params.eID) {
        this.loadEvent()
      } else this.show = true
    },
    loadUser() {
      this.eventStore.event.owner.isPerson = this.userStore.isPerson
      this.eventStore.event.owner.nickName = this.userStore.nickName
      this.eventStore.event.owner.uID = this.userStore.uID
      this.eventStore.event.owner.photoURL = this.userStore.user.userFire.account.photoURL
    },
    loadEvent() {
      if (this.$route.params.eID)
        getEvent(this.$route.params.eID)
          .then(({ data: event }) => {
            this.eventStore.event = { eID: this.$route.params.eID, ...event }
            this.eventStore.event.general.photoURLs.forEach(url => {
              this.eventStore.imageURLs.push(url)
              this.eventStore.images.push(false)
            });
            this.show = true
          })
      else this.show = true
    }
  },
  provide() {
    return {
      removeImage: (index) => this.images.splice(index, 1),
      addImage: (image) => this.images.push(image)
    }
  },
  mounted() {
    this.loadEvent()
    this.loadUser()
  },
  beforeUnmount() {
    this.eventStore.clear()
  }
}
</script>