<template>
  <div>
    <div style="border-bottom: solid 1px #E8E8E8;">
      <div class="row justify-center" style="margin-top:8px">
        <icon-logo-text style="height: 30px;" />
      </div>
      <div class="row no-wrap justify-between items-center" style="margin:16px;">
        <div class="row items-end" style="width: 100%; ;">
          <q-avatar size="28px">
            <img :src="userStore.photoURL">
          </q-avatar>
          <span style="margin-left: 12px; font-size: 16px;">
            Merhaba {{ userStore.name.split(" ")[0] }}
          </span>
        </div>
        <div class="flex" style="flex-shrink: 0; gap:8px">
          <q-btn style="width: 37px; height: 37px; border: solid 1px #00000010;" flat round dense
            @click="openPageMessage">
            <q-icon><icon-notification class="fill-primary" /></q-icon>
          </q-btn>
          <q-btn style="width: 37px; height: 37px; border: solid 1px #00000010;" flat round dense
            @click="openPageNotification">
            <q-icon><icon-message class="fill-primary" /></q-icon>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="row no-wrap justify-between items-end" style="margin: 0 16px; margin-top: 12px;">
      <div class="row no-wrap items-end" style="gap:4px">
        <div>
          <q-icon size="24px">
            <icon-location class="fill-primary" />
          </q-icon>
        </div>
        <div>
          <div class="text-left"
            style="height: 15px; font-size: 12px; font-weight: 400; color: #5A5A5A; font-style: italic;">
            Konum
          </div>
          <div class="row no-wrap items-center justify-between" style="gap:10px; height: 20px;">
            <span style="font-size: 16px; font-weight: 600;">
              {{ locationStore.city ? locationStore.city : "Konum Seçin" }}
            </span>
            <icon-arrow />
          </div>
        </div>
      </div>
      <div>
        <q-btn flat rounded size="12px" no-caps class="bg-primary text-white" style="height: 35px;">
          Etkinlik Oluştur
        </q-btn>
      </div>
    </div>
    <div class="row no-wrap justify-between items-center" style="margin:24px 16px; gap: 16px;">
      <q-input v-model="text" borderless dense rounded label="Etkinlik Ara"
        style="height: 40px; width:100%; border: solid 1px #E0E0E0; border-radius: 24px;">
        <template v-slot:prepend>
          <q-icon style="margin: 10px;">
            <icon-search />
          </q-icon>
        </template>
      </q-input>
      <q-btn round flat style="height: 40px; width: 40px; flex-shrink: 0; border: solid 1px #00000010;">
        <q-icon size="20px">
          <icon-filter />
        </q-icon>
      </q-btn>
    </div>
  </div>
  <template v-if="showLocation">
    <comp-location-choose @set-cord="setLocation" @end-func="showLocation = false" />
  </template>
</template>
<script>
import compLocationChoose from "../general/compLocationChoose.vue";
import iconLogoText from "@/icons/logo/iconFunoText.vue";
import iconMessage from "@/icons/events/iconMessage.vue";
import iconNotification from "@/icons/events/iconNotification.vue";
import iconArrow from "@/icons/events/iconArrow.vue";
import iconSearch from "@/icons/discover/iconSearch.vue";
import iconFilter from "@/icons/events/iconFilter.vue";
import iconLocation from "@/icons/create/iconLocation.vue";

import { useLocation } from "@/store/location.js";
import { getLocation } from "@/services/app/location";
import { showAlert } from "@/services/capacitor/dialog";
import { useUser } from "@/store/user";
export default {
  components: { compLocationChoose, iconLogoText, iconMessage, iconNotification, iconArrow, iconSearch, iconFilter, iconLocation },
  data() {
    return {
      showLocation: false,
      locationStore: useLocation(),
      userStore: useUser(),
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
  height: 10%;
  border-radius: 50%;
}
</style>