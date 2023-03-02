<template>
  <div>
    <div>
      <div class="row justify-between items-center">
        <span class="text-h6">Etkinlik Başlangıcı</span>
        <span class="text-caption">(Tarih/Saat)</span>
      </div>
      <div class="row no-wrap">
        <comp-date :value="startDate" :setValue="(value) => startDate = value" />
        <comp-time :value="startTime" :setValue="(value) => startTime = value" />
      </div>
    </div>
    <div>
      <div class="row justify-between items-center">
        <span class="text-h6">Etkinlik Bitişi</span>
        <span class="text-caption">(Tarih/Saat)</span>
      </div>
      <div class="row no-wrap">
        <comp-date :value="endDate" :setValue="(value) => endDate = value" />
        <comp-time :value="endTime" :setValue="(value) => endTime = value" />
      </div>
    </div>
    <div class="full-width">
      <div class="row no-wrap justify-between">
        <span class="text-h6"> Onaylı Katılım </span>
        <q-toggle color="bg-primary" v-model="event.event.conditions.approval" />
      </div>
    </div>
    <div class="full-width">
      <div class="row no-wrap justify-between">
        <span class="text-h6"> Katılımcı Limiti </span>
        <q-toggle color="bg-primary" v-model="showLimit" />
      </div>
      <q-slide-transition>
        <div v-show="showLimit">
          <q-input dense v-model.number="event.event.conditions.userLimit" type="number">
            <template v-slot:prepend>
              <span class="text-caption">
                Limit:
              </span>
            </template>
          </q-input>
        </div>
      </q-slide-transition>
    </div>
    <div class="full-width">
      <div class="row no-wrap justify-between">
        <span class="text-h6"> Yaş Aralığı </span>
        <q-toggle color="bg-primary" v-model="showAge" />
      </div>
      <q-slide-transition>
        <div v-show="showAge" class="row no-wrap content-center items-center">
          <q-input dense v-model.number="event.event.conditions.age.min" type="number">
            <template v-slot:prepend>
              <span class="text-caption">
                Min:
              </span>
            </template>
          </q-input>
          <q-input dense v-model.number="event.event.conditions.age.max" type="number">
            <template v-slot:prepend>
              <span class="text-caption">
                Max:
              </span>
            </template>
          </q-input>
        </div>
      </q-slide-transition>
    </div>
  </div>
</template>
<script>
import { event } from "@/store/events";
import compDate from "@/components/edit/buttons/compDate.vue";
import compTime from "@/components/edit/buttons/compTime.vue";
export default {
  components: { compDate, compTime },
  props: ["pageNumber", "setPage"],
  data() {
    return {
      startDate: new Date().toLocaleDateString("tr-TR"),
      startTime: new Date().toLocaleTimeString("tr-TR"),
      endDate: new Date().toLocaleDateString("tr-TR"),
      endTime: new Date().toLocaleTimeString("tr-TR"),
      showLimit: false,
      showAge: false,
      event: event(),
    };
  },
  methods: {
    loadDate() {
      if (this.event.event.date.start) {
        this.startDate = new Date(this.event.event.date.start.seconds * 1000).toLocaleDateString("tr-TR");
        this.startTime = new Date(this.event.event.date.start.seconds * 1000).toLocaleTimeString("tr-TR");
        this.endDate = new Date(this.event.event.date.start.seconds * 1000).toLocaleDateString("tr-TR");
        this.endTime = new Date(this.event.event.date.start.seconds * 1000).toLocaleTimeString("tr-TR");
      }
    },
    updateStartDate() {
      const date = this.startDate.split(".");
      const time = this.startTime.split(":");
      this.event.event.date.start = new Date(date[2], date[1] - 1, date[0] - 1, time[0], time[1]).getTime()
    },
    updateEndDate() {
      if (!this.endDate || !this.endTime) return;
      const date = this.endDate.split(".");
      const time = this.endTime.split(":");
      this.event.event.date.end = new Date(date[2], date[1] - 1, date[0] - 1, time[0], time[1]).getTime()
    },
  },
  mounted() {
    if (this.page == 0 && this.setPage) this.setPage(1);
    this.loadDate();
    this.updateStartDate()
    this.updateEndDate()
  },
  watch: {
    showLimit() {
      if (this.showLimit == false)
        this.event.event.conditions.userLimit = 0
    },
    showAge() {
      if (this.showLimit == false) {
        this.event.event.conditions.age.min = 0
        this.event.event.conditions.age.max = 0
      }
    },
    startDate() {
      this.updateStartDate()
    },
    startTime() {
      this.updateStartDate()
    },
    endDate() {
      this.updateEndDate()
    },
    endTime() {
      this.updateEndDate()
    }

  }
};
</script>
  