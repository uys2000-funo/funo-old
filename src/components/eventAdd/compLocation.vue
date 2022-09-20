<template>
  <div class="full-width">
    <span class="text-h6"> Konum Adı </span>
    <div class="row no-wrap justify-between">
      <span class="text-h6">Bu bir Online Etkinlik</span>
      <q-toggle
        color="bg-primary"
        v-model="eventAdd.event.type"
        @click="updateLocationType"
      />
    </div>
    <div v-if="!eventAdd.event.type">
      <q-input
        outlined
        v-model="eventAdd.event.app.text"
        placeholder="Konum Seçin"
        @click="selectLocation = true"
      />
      <q-input
        outlined
        v-model="eventAdd.event.url"
        placeholder="Bizi Nasıl Bulabilirler? (Tarif)"
      />
    </div>
    <div v-if="eventAdd.event.type">
      <q-input
        outlined
        v-model="eventAdd.event.app.text"
        placeholder="Platformu yazınız"
      />
      <q-input
        outlined
        v-model="eventAdd.event.url"
        placeholder="Etkinlik Adresi (URL)"
      />
    </div>
  </div>
  <div class="full-width">
    <span class="text-h6">Ücret Bilgisi</span>
    <div class="row no-wrap justify-between">
      <span class="text-h6"> Ücretli Etkinlik </span>
      <q-toggle color="bg-primary" v-model="price" />
    </div>
    <q-slide-transition>
      <div v-show="price">
        <q-input
          outlined
          v-model="eventAdd.event.price"
          type="number"
          placeholder="Fiyat Bilgisi Giriniz"
        />
      </div>
    </q-slide-transition>
  </div>
  <div v-if="selectLocation">
    <comp-location-choose
      @setCord="(value) => updateLocation(value)"
      @endFunc="selectLocation = false"
    />
  </div>
</template>

<script>
import { getLocation } from "@/services/geoCode/geocode";
import { eventAdd } from "@/store/eventAdd";
import compLocationChoose from "@/components/general/compLocationChoose.vue";
export default {
  components: {
    compLocationChoose,
  },
  data() {
    return {
      eventAdd: eventAdd(),
      price: false,
      selectLocation: false,
      tmpApp: null,
      tmpLocation: null,
    };
  },
  methods: {
    updateLocationType: function (value) {
      if (value) {
        this.tmpLocation = this.eventAdd.event.app;
        if (this.tmpApp) {
          this.eventAdd.event.app = this.tmpApp;
        } else this.eventAdd.event.app = { text: "" };
      } else {
        this.tmpApp = this.eventAdd.event.app;
        if (this.tmpLocation) {
          this.eventAdd.event.app = this.tmpLocation;
        } else this.eventAdd.event.app = { text: "" };
      }
    },
    updateLocation: function (value) {
      getLocation(value[0], value[1]).then((res) => {
        this.eventAdd.event.app = { coord: value, text: res };
      });
    },
  },
};
</script>
