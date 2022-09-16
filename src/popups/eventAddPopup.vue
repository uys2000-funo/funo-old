<template>
  <div>
    <q-carousel
      :model-value="`${page}`"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="co bg-secondary"
    >
      <!-- Temel Bilgiler-->
      <q-carousel-slide name="0">
        <div>
          <span>Etkinlik Adı</span>
          <div>
            <q-input
              :model-value="event.name"
              @update:model-value="updateEvent('name', $event)"
              outlined
              placeholder="Etkinlik Adı"
            />
          </div>
        </div>
        <div>
          <span>Açıklama</span>
          <div>
            <q-input
              :model-value="event.desc"
              @update:model-value="updateEvent('desc', $event)"
              outlined
              placeholder="Etkinlik hakkında detaylı bilgi girin"
            />
          </div>
        </div>
        <div>
          <span>Etkinlik Kategorisini Seçin</span>
          <div>
            <div class="row wrap">
              <div
                class="col-4 row"
                v-for="n in [...Array(buttons.length).keys()]"
                :key="n"
              >
                <comp-button-check
                  :event="event"
                  :btn="buttons[n]"
                  :btnName="buttonNames[n]"
                  clr="bg-secondary"
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </q-carousel-slide>
      <!-- Zaman Tarih-->
      <q-carousel-slide name="1">
        <div
          class="h row no-wrap fit justify-between items-center content-center"
        >
          <div>
            <span>Başlangıç Tarihi</span>
            <div>
              <q-input
                :model-value="event.startDate.date"
                @update:model-value="
                  updateEventInner('startDate', 'date', $event)
                "
                outlined
                mask="##/##/####"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :model-value="event.startDate.date"
                        @update:model-value="
                          updateEventInner('startDate', 'date', $event)
                        "
                        mask="DD/MM/YYYY"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <span>Bitiş Tarihi</span>
            <div>
              <q-input
                :model-value="event.endDate.date"
                @update:model-value="
                  updateEventInner('endDate', 'date', $event)
                "
                outlined
                mask="##/##/####"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :model-value="event.endDate.date"
                        @update:model-value="
                          updateEventInner('endDate', 'date', $event)
                        "
                        mask="DD/MM/YYYY"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div
          class="h row no-wrap fit justify-between items-center content-center"
        >
          <div>
            <span>Başlangıç Saati</span>
            <div>
              <q-input
                outlined
                :model-value="event.startDate.time"
                @update:model-value="
                  updateEventInner('startDate', 'time', $event)
                "
                mask="##:##"
              >
                <template v-slot:prepend>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        :model-value="event.startDate.time"
                        @update:model-value="
                          updateEventInner('startDate', 'time', $event)
                        "
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <span>Bitiş Saati</span>
            <div>
              <q-input
                outlined
                :model-value="event.endDate.time"
                @update:model-value="
                  updateEventInner('endDate', 'time', $event)
                "
                mask="##:##"
              >
                <template v-slot:prepend>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        :model-value="event.endDate.time"
                        @update:model-value="
                          updateEventInner('endDate', 'time', $event)
                        "
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div>
          <div class="row no-wrap justify-between">
            <span> Katılımcı Limiti </span>
            <q-toggle color="bg-primary" v-model="limit" />
          </div>
          <q-slide-transition>
            <div v-show="limit">
              <q-input
                :model-value="event.limit"
                @update:model-value="updateEvent('limit', $event)"
                outlined
                type="number"
                placeholder="Katılımcı Limiti"
              />
            </div>
          </q-slide-transition>
        </div>
        <div>
          <div class="row no-wrap justify-between">
            <span @click="inf = !inf"> Onaylı Katılım </span>
            <q-toggle
              color="bg-primary"
              :model-value="event.apro"
              @update:model-value="updateEvent('apro', $event)"
            />
          </div>
          <q-tooltip v-model="inf">
            Bu etkinliğe kimlerin katılabileceğini yönetebilmek ve onaylamak
            istiyorsanız bu seçeneği işaretleyin
          </q-tooltip>
        </div>
      </q-carousel-slide>
      <!-- Konum Fiyat-->
      <q-carousel-slide name="2">
        <div>
          <span> Konum Adı </span>
          <div class="row no-wrap justify-between">
            <span>Bu bir Online Etkinlik</span>
            <q-toggle
              color="bg-primary"
              :model-value="event.type"
              @update:model-value="updateLocationType"
            />
          </div>
          <div v-if="!event.type">
            <q-input
              outlined
              :model-value="event.app?.text"
              placeholder="Konum Seçin"
              @click="selectLocation = true"
            />
            <q-input
              outlined
              :model-value="event.url"
              @update:model-value="updateEvent('url', $event)"
              placeholder="Bizi Nasıl Bulabilirler? (Tarif)"
            />
          </div>
          <div v-if="event.type">
            <q-input
              outlined
              :model-value="event.app?.text"
              @update:model-value="updateEvent('app', { text: $event })"
              placeholder="Platformu yazınız"
            />
            <q-input
              outlined
              :model-value="event.url"
              @update:model-value="updateEvent('url', $event)"
              placeholder="Etkinlik Adresi (URL)"
            />
          </div>
        </div>
        <div>
          <span>Ücret Bilgisi</span>
          <div class="row no-wrap justify-between">
            <span> Ücretli Etkinlik </span>
            <q-toggle color="bg-primary" v-model="price" />
          </div>
          <q-slide-transition>
            <div v-show="price">
              <q-input
                outlined
                :model-value="event.price"
                @update:model-value="updateEvent('price', $event)"
                type="number"
                placeholder="Fiyat Bilgisi Giriniz"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-carousel-slide>
      <!-- Görsel-->
      <q-carousel-slide name="3">
        <q-img
          :src="
            img == null ? require('@/assets/images/registerUpload.svg') : img
          "
          @click="imageEvent"
        >
          <div class="absolute-full text-subtitle2 flex flex-center bg">
            Profil fotoğrafı yüklemek için dokunun
          </div>
        </q-img>
        <div class="hid">
          <input
            @change="imageSetEvent"
            multiple
            ref="imgPicker"
            type="file"
            accept="image/*"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
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
import compButtonCheck from "../components/compButtonCheck.vue";
import compLocationChoose from "../components/general/compLocationChoose.vue";
export default {
  components: {
    compButtonCheck,
    compLocationChoose,
  },
  props: ["page", "event"],
  inject: ["setImages", "updateEvent", "updateEventInner"],
  data() {
    return {
      img: "",
      selectLocation: false,
      limit: false,
      price: false,
      inf: false,
      tmpApp: { text: "" },
      tmpLocation: { text: "" },
      buttons: ["spor", "artt", "educ", "musi", "meet", "part"],
      buttonNames: ["Spor", "Art", "Education", "Music", "Meeting", "Party"],
    };
  },
  methods: {
    updateLocationType: function (value) {
      this.updateEvent("type", value);
      if (value) {
        this.tmpLocation = this.event.app;
        if (this.tmpApp) {
          this.updateEvent("app", this.tmpApp);
        } else this.updateEvent("app", { text: "" });
      } else {
        this.tmpApp = this.event.app;
        if (this.tmpLocation) {
          this.updateEvent("app", this.tmpLocation);
        } else this.updateEvent("app", { text: "" });
      }
    },
    updateLocation: function (value) {
      getLocation(value[0], value[1]).then((res) => {
        this.updateEvent("app", { coord: value, text: res });
      });
    },
    updateImage: function (val) {
      this.img = val.target.result;
    },
    imageSetEvent: function (val) {
      const img = val.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", this.updateImage, false);
      reader.readAsDataURL(img);
      this.setImages(val.target.files);
    },
    imageEvent: function () {
      this.$refs.imgPicker.click();
    },
  },
  watch: {
    inf() {
      if (this.inf == true) setTimeout(() => (this.inf = false), 5000);
    },
  },
};
</script>
<style scoped>
.co {
  width: 100vw;
  height: 100%;
}
.h > div {
  width: 45%;
}
.bg {
  color: #000;
  background-color: #00000000;
}
.hid {
  display: none;
}
</style>
