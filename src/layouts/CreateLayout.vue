<template>
  <router-view v-slot="{ Component }">
    <comp-popup fullscreen>
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
            <component :is="Component" :pageNumber="pageNumber" :setPageNumber="setPageNumber" :images="images" />
          </div>
        </div>
        <div class="full-width flex justify-center q-pb-md q-pt-xs">
          <div style="width:75%">
            <q-btn class="fit bg-primary rounded" rounded @click="goNextPage">
              {{ this.pageNumber < 3 ? "Devam" : "Oluştur" }} </q-btn>
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
import { isNumeric } from "@/utils/string"
import { event } from '@/store/events';
import { createEvent } from '@/services/app/event';
import { user } from '@/store/user';
export default {
  components: { compPopup, backButton, compWheel },
  data() {
    return {
      user: user(),
      event: event(),
      images: [],
      pageName: "",
      pageNumber: 0
    }
  },
  methods: {
    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
    },
    goNextPage() {
      if (this.pageNumber < 3)
        this.pageNumber = this.pageNumber + 1
      else createEvent(this.user.uID, this.event.event, this.images)
        .then(() => {
          this.$router.push({ name: "EventsPage" })
          this.event.clearEvent()
        })
    },
  },
  provide() {
    return {
      removeImage: (index) => this.images.splice(index, 1),
      addImage: (image) => this.images.push(image)
    }
  },
  mounted() {
    const pID = this.$route.params.pID
    if (isNumeric(pID)) this.pageNumber = parseFloat(pID)
    this.event.event.general.oName = this.user.userName
    this.event.event.general.oID = this.user.uID
  }
}
</script>