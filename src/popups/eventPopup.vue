<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="bg-secondary">
      <go-back-btn :beforeGoBack="() => (dialog = false)" />
      <g-img :cImg="event.imgCount" :eID="$route.params.id" />
      <div class="text-center">{{ event.name }}</div>
      <div class="text-center row justify-around">
        <q-btn rounded dense flat>
          <g-icon src="call.svg" sizeO="10vw" />
        </q-btn>
        <q-btn rounded dense flat>
          <g-icon src="location.svg" sizeO="10vw" />
        </q-btn>
        <q-btn rounded dense flat>
          <g-icon src="message2.svg" sizeO="10vw" />
        </q-btn>
        <q-btn rounded dense flat>
          <g-icon src="share.svg" sizeO="10vw" />
        </q-btn>
        <q-btn>Takip Et</q-btn>
      </div>
      <div v-if="event.startDate">
        <g-icon src="clock.svg" size="15vw" />
        {{ event.startDate.time }}-{{ event.endDate.time }}
        <g-icon src="calendar.svg" sizeO="15vw" />
        {{ event.startDate.date }}
        <g-icon src="sandClock.svg" sizeO="15vw" />
        {{ event.price }}
      </div>
      <div style="min-height: 15vw" class="row no-wrap items-center content-center">
        <g-icon src="location.svg" sisizeOze="15vw" />
        {{ event.app?.text }}
      </div>
      <div style="min-height: 15vw" class="row no-wrap items-center content-center">
        <g-icon src="tag.svg" sizeO="15vw" />
        {{ event.desc }}
      </div>
      <div>
        <g-icon src="gender.svg" sizeO="15vw" />
        <comp-participants-vue :userIDs="event.users" />
      </div>
      <div>
        <q-input
          v-model="text"
          filled
          type="textarea"
          placeholder="Yorum Ekle..."
          autogrow
        />
        <div class="text-right text-subtitle2">12 yorumun tümünü görün</div>
      </div>
      <div class="text-center">
        <q-btn class="bt bg-primary">
          <span> Katıl </span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { getEvent, getImgStorage } from "@/services/firebase/events";
import gImg from "../components/eventPopup/compImg.vue";
import goBackBtn from "../components/general/backButtonTopLeft.vue";
import gIcon from "../components/gIcon.vue";
import compParticipantsVue from "../components/general/compEvent/compParticipants.vue";
export default {
  components: {
    gImg,
    gIcon,
    goBackBtn,
    compParticipantsVue,
  },
  data() {
    return {
      dialog: true,
      event: {},
      text: "",
    };
  },
  methods: {
    getEvent: function () {
      getEvent(this.$route.params.id).then((res) => {
        this.event = res.data();
        console.table(this.event);
      });
    },
    getUserImage: function () {
      getImgStorage;
    },
  },
  mounted() {
    this.getEvent();
  },
  watch: {
    event() {
      this.getUserImage();
    },
  },
};
</script>

<style scoped>
.h {
  font-size: 2pc;
}
.bt {
  border-radius: 10px;
  height: 7vh;
  width: 30vw;
  margin: 1vh;
}
</style>
