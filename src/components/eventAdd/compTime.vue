<template>
  <div class="h row no-wrap fit justify-between items-center content-center">
    <div>
      <span class="text-h6">Başlangıç Tarihi</span>
      <div>
        <q-input
          v-model="eventAdd.event.startDate.date"
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
                  v-model="eventAdd.event.startDate.date"
                  mask="DD/MM/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div>
      <span class="text-h6">Bitiş Tarihi</span>
      <div>
        <q-input
          v-model="eventAdd.event.endDate.date"
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
                <q-date v-model="eventAdd.event.endDate.date" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
  <div class="h row no-wrap fit justify-between items-center content-center">
    <div>
      <span class="text-h6">Başlangıç Saati</span>
      <div>
        <q-input outlined v-model="eventAdd.event.startDate.time" mask="##:##">
          <template v-slot:prepend>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="eventAdd.event.startDate.time">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div>
      <span class="text-h6">Bitiş Saati</span>
      <div>
        <q-input outlined v-model="eventAdd.event.endDate.time" mask="##:##">
          <template v-slot:prepend>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="eventAdd.event.endDate.time">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
  <div class="full-width">
    <div class="row no-wrap justify-between">
      <span class="text-h6"> Katılımcı Limiti </span>
      <q-toggle color="bg-primary" v-model="limit" />
    </div>
    <q-slide-transition>
      <div v-show="limit">
        <q-input
          v-model="eventAdd.event.limit"
          outlined
          type="number"
          placeholder="Katılımcı Limiti"
        />
      </div>
    </q-slide-transition>
  </div>
  <div class="full-width" @click="inf = !inf">
    <div class="row no-wrap justify-between">
      <span class="text-h6"> Onaylı Katılım </span>
      <q-toggle color="bg-primary" v-model="eventAdd.event.apro" />
    </div>
    <q-tooltip v-model="inf">
      Bu etkinliğe kimlerin katılabileceğini yönetebilmek ve onaylamak
      istiyorsanız bu seçeneği işaretleyin
    </q-tooltip>
  </div>
  <div class="full-width">
    <div class="row no-wrap justify-between">
      <span class="text-h6"> Katılımcı Limiti </span>
      <q-toggle color="bg-primary" v-model="range" />
    </div>
    <q-slide-transition>
      <div v-show="range" class="row no-wrap">
        <q-input
          v-model="eventAdd.event.ageRange.min"
          outlined
          type="number"
          label="min"
        />
        <q-input
          v-model="eventAdd.event.ageRange.max"
          outlined
          type="number"
          label="max"
        />
      </div>
    </q-slide-transition>
  </div>
</template>
<script>
import { eventAdd } from "@/store/eventAdd";
export default {
  data() {
    return {
      eventAdd: eventAdd(),
      inf: false,
      limit: false,
      range: false,
    };
  },
  mounted() {
    this.eventAdd.setTime();
  },
};
</script>
