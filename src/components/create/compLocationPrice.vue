<template>
  <div>
    <div class="row no-wrap justify-between">
      <span class="text-h6">Etkinlik Türü <span class="text-caption">(Yüz Yüze / Online)</span></span>
      <q-toggle color="bg-primary" v-model="eventStore.event.location.isOnline" />
    </div>
    <div class="full-width">
      <span class="text-h6">{{ isOnline ? "Platform" : "Konum" }}</span>
      <div>
        <q-input v-model="eventStore.event.location.text" outlined
          :placeholder="isOnline ? 'Platform ismi' : 'Konum seçiniz'" @click="clickLocationText">
          <template v-slot:append v-if="!isOnline">
            <q-btn round dense class="bg-primary text-black" @click="() => showLocationChooser = true">></q-btn>
          </template>
        </q-input>
      </div>
    </div>
    <div class="full-width">
      <span class="text-h6">{{ isOnline ? "Link" : "Tarif" }}</span>
      <div>
        <q-input v-model="eventStore.event.location.description" outlined
          :placeholder="isOnline ? 'Etkinlik adresi (URL)' : 'Konum tarifi'" />
      </div>
    </div>
    <div class="full-width">
      <div class="row no-wrap justify-between">
        <span class="text-h6"> Ücretli Etkinlik </span>
        <q-toggle color="bg-primary" v-model="showPrice" />
      </div>
      <q-slide-transition>
        <div v-show="showPrice">
          <q-input dense v-model.number="eventStore.event.conditions.price" type="number">
            <template v-slot:prepend>
              <span class="text-caption">
                Ücret:
              </span>
            </template>
          </q-input>
        </div>
      </q-slide-transition>
    </div>
  </div>
  <template v-if="showLocationChooser">
    <comp-location-choose @set-cord="setLocation" @end-func="this.showLocationChooser = false" :coords="coords" />
  </template>
</template>
<script>
import { useEvent } from "@/store/event";
import compLocationChoose from "../general/compLocationChoose.vue";
import { getLocation } from "@/services/app/location";
import { showAlert } from "@/services/capacitor/dialog";
export default {
  components: { compLocationChoose },
  props: ["pageNumber", "setPage"],
  data() {
    return {
      eventStore: useEvent(),
      showPrice: false,
      textCache: "",
      showLocationChooser: false,
      descriptionCache: null,
      coords: [0, 0]
    };
  },
  methods: {
    clickLocationText() {
      if (this.eventStore.event.location.cordinates == null && this.isOnline == false) this.showLocationChooser = true
    },
    setLocation(coordinates) {
      if (this.isOnline) return;
      getLocation(coordinates).then(result => {
        console.log(result)
        if (!result.status) return showAlert("Hata", "Lütfen Geçerli bi konum seçiniz")
        this.eventStore.event.location.coordinates = coordinates
        this.eventStore.event.location.text = result.address
        this.eventStore.event.location.city = result.city
        this.coords = coordinates
      })

    }
  },
  computed: {
    isOnline() {
      return this.eventStore.event.location.isOnline;
    }
  },
  mounted() {
    if (this.page == 0 && this.setPage) this.setPage(1);
    this.coords = this.eventStore.event.location.coordinates
  },
  watch: {
    showPrice() {
      if (!this.showPrice) {
        this.eventStore.event.conditions.price = 0
      }
    },
    isOnline() {
      this.textCache = this.eventStore.event.location.text;
      this.descriptionCache = this.eventStore.event.location.description;
      this.eventStore.event.location.text = ""
      this.eventStore.event.location.description = ""
    }
  }
};
</script>
    