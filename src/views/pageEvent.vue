<template>
  <q-carousel
    v-model="slide"
    vertical
    transition-prev="slide-down"
    transition-next="slide-up"
    animated
    keep-alive
    class="fit q-pa-none"
  >
    <q-carousel-slide name="event">
      <div class="bg-secondary">
        <comp-img-show :cImg="event.imgCount" :eID="$route.params.id" />
        <comp-info :event="event" />
        <div></div>
        <div class="text-center">
          <q-btn
            class="bt text-center bg-primary"
            :label="joinCheck ? 'Vazgeç' : 'katıl'"
            dense
            @click="joinCheck ? exitEvent(event) : joinEvent(event)"
          />
        </div>
        <div class="text-center" @click="slide = 'comment'">
          <q-btn flat class="bt" icon="expand_more" />
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="comment">
      <div class="bg-secondary">
        <div class="bg-secondary">
          <div class="text-center" @click="slide = 'event'">
            <q-btn flat class="bt" icon="expand_less" />
          </div>
        </div>
        <comp-comments />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import compImgShow from "../components/event/compImgShow.vue";
import compInfo from "@/components/event/compInfo.vue";
import compComments from "@/components/event/compComments.vue";
import { exitEvent, joinEvent } from "@/services/firebase/event";
import { chekUserEventJoinStatus } from "@/services/core/main";
export default {
  components: {
    compImgShow,
    compInfo,
    compComments,
  },
  props: ["event"],
  data() {
    return {
      joinCheck: false,
      text: "",
      slide: "event",
    };
  },
  methods: {
    checkEvent: function () {
      return chekUserEventJoinStatus(this.user.user, this.event.id);
    },
    joinEvent: function (event) {
      const [user, uID] = this.updateUser(event.id);
      event = this.updateEvent(event, uID);
      this.joinCheck = this.checkEvent();
      joinEvent(uID, event.id, user.userFire, event);
    },
    exitEvent: function (event) {
      const [user, uID] = this.updateUserExit(event.id);
      event = this.updateEventExit(event, uID);
      this.joinCheck = this.checkEvent();
      exitEvent(uID, event.id, user.userFire, event);
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
.q-carousel__slide {
  padding: 0px;
}
</style>
