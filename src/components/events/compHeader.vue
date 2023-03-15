<template>
  <div>
    <div class="row no-wrap q-px-sm q-pt-md">
      <div style="width:25%">
        <icon-logo-text class="s" />
      </div>
      <div class="row items-center justify-center" style="flex-grow: 1;" @click="() => showLocation = !showLocation">
        {{ locationStore.city ? locationStore.city : "Konum Seçin" }}
        <span class="q-px-xs" style="transform: rotate(90deg);">></span>
      </div>
      <div class="row no-wrap items-center justify-end" style="width:25%; height: 45px;">
        <q-btn round dense size="md" flat class="q-mr-xs shadow-3" @click="openPageMessage">
          <q-icon><icon-message class="fill-accent" /></q-icon>
        </q-btn>
        <q-btn round dense size="md" flat class="q-mr-xs shadow-3" @click="openPageNotification">
          <q-icon><icon-notification class="fill-accent" /></q-icon>
        </q-btn>
      </div>
    </div>
    <div>
      <q-scroll-area style="height: 45px; width: 100vw">
        <div class="row no-wrap items-center" style="height: 45px;">
          <comp-button value="art" text="Sanat"><icon-art /></comp-button>
          <comp-button value="education" text="Eğitim"><icon-education /></comp-button>
          <comp-button value="meeting" text="Buluşma"><icon-meeting /></comp-button>
          <comp-button value="music" text="Müzik"><icon-music /></comp-button>
          <comp-button value="party" text="Parti"><icon-party /></comp-button>
          <comp-button value="sport" text="Spor"><icon-sport /></comp-button>
        </div>
      </q-scroll-area>
    </div>
  </div>
  <template v-if="showLocation">
    <comp-location-choose @set-cord="setLocation" @end-func="showLocation = false" />
  </template>
</template>
<script>
import compLocationChoose from "../general/compLocationChoose.vue";
import iconLogoText from "@/icons/general/iconLogoText.vue";
import iconMessage from "@/icons/events/iconMessage.vue";
import iconNotification from "@/icons/events/iconNotification.vue";
import compButton from "./compButton.vue";

import iconArt from "@/icons/tags/iconArt.vue";
import iconEducation from "@/icons/tags/iconEducation.vue";
import iconMeeting from "@/icons/tags/iconMeeting.vue";
import iconMusic from "@/icons/tags/iconMusic.vue";
import iconParty from "@/icons/tags/iconParty.vue";
import iconSport from "@/icons/tags/iconSport.vue";
import { useLocation } from "@/store/location.js";
import { getLocation } from "@/services/app/location";
import { showAlert } from "@/services/capacitor/dialog";
export default {
  components: { compLocationChoose, iconLogoText, iconMessage, iconNotification, compButton, iconArt, iconEducation, iconMeeting, iconMusic, iconParty, iconSport },
  data() {
    return {
      showLocation: false,
      locationStore: useLocation(),
    }
  },
  methods: {
    setLocation(coordinates) {
      getLocation(coordinates).then(result => {
        if (!result.status) return showAlert("Hata", "Lütfen Geçerli bi konum seçiniz")
        this.locationStore.city = result.city;
        this.locationStore.address = result.address;
        this.locationStore.coordinates = result.coordinates;
      })
    },
    openPageMessage() {
      this.$router.push({ name: "MessagesPage" })
    },
    openPageNotification() {
      this.$router.push({ name: "NotificationsPage" })
    }
  }
}

</script>
<style scoped>
.icon {
  height: 50%;
  border-radius: 50%;
}

.s {
  filter: drop-shadow(0px 1px 3px rgb(0 0 0 / 0.2));
}
</style>