<template>
  <div v-if="checkTags" class="q-mb-md a">
    <div class="row wrap justify-between items-start content-start">
      <span>{{ event.ownersNames[0] }}</span>
      <span>{{ event.name }}</span>
    </div>
    <div
      class="img"
      :style="`background-image: url('${require('@/assets/images/loading.gif')}'); ${bgImg}`"
    ></div>
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4">
        {{ event.startDate.time }}-{{ event.endDate.time }}
      </span>
      <span class="col-4 text-center q-my-sm">
        {{ event.price == 0 ? "ücretsiz" : event.price }}
      </span>
      <comp-participants-vue class="col-4 text-right" :userIDs="event.users" />
    </div>
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4">{{ event.app }}</span>
      <q-btn
        class="col-4 text-center bg-primary"
        :label="joinCheck ? 'Vazgeç' : 'katıl'"
        dense
        @click="joinCheck ? exitEvent(event) : joinEvent(event)"
      />
      <span class="col-4 text-right">
        <router-link :to="{ path: `/app/main/events/event/${event.id}` }">
          Dahası
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { getImgStorage, joinEvent, exitEvent } from "@/services/firebase/main";
import { chekUserEventJoinStatus } from "@/services/core/main";
import compParticipantsVue from "./compParticipants.vue";
import { user } from "@/storages/user";
export default {
  props: ["event", "tags"],
  components: {
    compParticipantsVue,
  },
  data() {
    return {
      imgPath: "",
      joinCheck: false,
      user: user().user,
      images: [],
    };
  },
  computed: {
    bgImg: function () {
      this.getImg();
      return this.imgPath;
    },
    checkTags: function () {
      if (this.tags.length != 0) {
        if (this.tags.some((val) => this.event.tags[val])) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  methods: {
    filtering: function (array, item) {
      return array.filter(function (value) {
        return value != item;
      });
    },
    getImg: function () {
      getImgStorage(`E/${this.event.id}/imgs/img0`).then((res) => {
        console.log(res);
        this.imgPath = `background-image: url("${res}"); `;
      });
    },
    updateUser: function (eId) {
      console.log(this.user);
      if (this.user.userFire == undefined)
        this.user.userFire = {
          joinEvent: [],
        };
      else if ((this.user.userFire.joinEvent = undefined))
        this.user.userFire.joinEvent = [];
      this.user.userFire.joinEvent.push(eId);
      user().setUser(this.user);
      return [this.user, this.user.userAuth.user.uid];
    },
    updateEvent: function (event, uID) {
      if (event.users == undefined) event.users = [];
      event.users.push(uID);
      return event;
    },
    updateUserExit: function (eId) {
      const events = this.user.userFire.joinEvent;
      this.user.userFire.joinEvent = this.filtering(events, eId);
      user().setUser(this.user);
      return [this.user, this.user.userAuth.user.uid];
    },
    updateEventExit: function (event, uID) {
      if (event.users == undefined) event.users = [];
      event.users = this.filtering(event.users, uID);
      return event;
    },
    checkEvent: function () {
      return chekUserEventJoinStatus(this.user, this.event.id);
    },
    joinEvent: function (event) {
      const [user, uID] = this.updateUser(event.id);
      event = this.updateEvent(event, uID);
      joinEvent(uID, event.id, user.userFire, event).then(() => {
        this.joinCheck = this.checkEvent();
      });
    },
    exitEvent: function (event) {
      console.log("exit");
      const [user, uID] = this.updateUserExit(event.id);
      event = this.updateEventExit(event, uID);
      exitEvent(uID, event.id, user.userFire, event).then(() => {
        this.joinCheck = this.checkEvent();
      });
    },
    getUserImages: function () {},
  },
  mounted() {
    this.joinCheck = this.checkEvent();
  },
};
</script>
<style scoped>
.img {
  height: 200px;
  border-radius: 10px;
  margin: auto;
  background-position: top;
  background-size: cover;
}
.q-btn {
  border-radius: 10px;
  width: 25%;
}
.a {
  background: rgba(245, 247, 251, 0.01);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px 15px;
}
</style>
