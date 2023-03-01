<template>
  <div>
    <div class="row no-wrap justify-between">
      <span class="text-h6">Etkinlik Türü <span class="text-caption">(Yüz Yüze / Online)</span></span>
      <q-toggle color="bg-primary" v-model="event.event.location.isOnline" />
    </div>
    <div class="full-width">
      <span class="text-h6">{{ isOnline ? "Platform" : "Konum" }}</span>
      <div>
        <q-input v-model="event.event.location.text" outlined :placeholder="isOnline ? 'Platform ismi' : 'Konum seçiniz'"
          @click="clickLocationText">
          <template v-slot:append v-if="!isOnline">
            <q-btn round dense class="bg-primary text-black" @click="showLocationChooser = true">></q-btn>
          </template>
        </q-input>
      </div>
    </div>
    <div class="full-width">
      <span class="text-h6">{{ isOnline ? "Link" : "Tarif" }}</span>
      <div>
        <q-input v-model="event.event.location.description" outlined
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
          <q-input dense v-model.number="event.event.conditions.price" type="number">
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
    <comp-location-choose @coord="[54.82896654088406, 39.831893822753904]" @set-cord="setLocation"
      @end-func="this.showLocationChooser = false" />
  </template>
</template>
<script>
import { event } from "@/store/events";
import { getLocation } from "@/services/geoCode/geocode";
import compLocationChoose from "../general/compLocationChoose.vue";
export default {
  components: { compLocationChoose },
  props: ["pageNumber", "setPage"],
  data() {
    return {
      event: event(),
      showPrice: false,
      textCache: "",
      showLocationChooser: false,
      descriptionCache: null,
    };
  },
  methods: {
    clickLocationText() {
      if (this.event.event.location.cordinates == null && this.isOnline == false) this.showLocationChooser = true
    },
    setLocation(value) {
      if (this.isOnline) return;
      this.event.event.location.cordinates = value
      getLocation(value[0], value[1])
        .then(text => this.event.event.location.text = text)
    }
  },
  computed: {
    isOnline() {
      return this.event.event.location.isOnline;
    }
  },
  mounted() {
    if (this.page == 0 && this.setPage) this.setPage(1);
  },
  watch: {
    showPrice() {
      if (!this.showPrice) {
        this.event.event.conditions.price = 0
      }
    },
    isOnline() {
      this.textCache = this.event.event.location.text;
      this.descriptionCache = this.event.event.location.description;
      this.event.event.location.text = ""
      this.event.event.location.description = ""
    }
  }
};
</script>
    