<template>
  <div v-if="checkTags" class="q-mb-md a">
    <!--Upper Texts and Settings Button-->
    <div class="row no-wrap justify-between items-start content-start">
      <span class="upper-texts">
        <router-link
          :to="{
            path:
              event.owners[0] == user.ID
                ? `/app/user/share`
                : `/app/profile/${event.owners[0]}/share`,
          }"
        >
          {{ event.ownersNames[0] }}
        </router-link>
      </span>
      <div
        style="width: 50%"
        class="row no-wrap justify-end items-end content-center"
      >
        <span class="upper-texts" style="max-width: 90%">
          {{ event.name }}
        </span>
        <!--Seetings Button-->
        <q-icon
          v-ripple
          size="xs"
          name="more_vert"
          @click="pages.openEventSettinsg(event)"
        />
      </div>
    </div>
    <!--Image-->
    <div
      class="img"
      :style="`background-image: url('${require('@/assets/images/loading.gif')}'); ${bgImg}`"
    ></div>
    <!--Bottom Informations-->
    <!--First Line-->
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4">
        {{ event.startDate.time }}-{{ event.endDate.time }}
      </span>
      <span class="col-4 text-center q-my-sm">
        {{ event.price == 0 ? "ücretsiz" : event.price }}
      </span>
      <comp-participants-vue class="col-4 text-right" :userIDs="event.users" />
    </div>
    <!--Second Line-->
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4 upper-texts" style="max-width: 75%">
        {{ event.app.text }}
      </span>
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
import { getImgStorage, joinEvent, exitEvent } from "@/services/firebase/event";
import { chekUserEventJoinStatus } from "@/services/core/main";
import compParticipantsVue from "./compEvent/compParticipants.vue";
import { pages } from "@/store/pages";
import { user } from "@/store/user";
export default {
  props: ["event", "tags"],
  components: {
    compParticipantsVue,
  },
  data() {
    return {
      pages: pages(),
      imgPath: "",
      joinCheck: false,
      user: user(),
      images: [],
    };
  },
  computed: {
    bgImg: function () {
      this.getImg();
      return this.imgPath;
    },
    checkTags: function () {
      const tl = this.tags.length;
      if (tl != 0) {
        let c = 0;
        this.tags.forEach((element) => {
          if (this.event.tags[element]) c += 1;
        });
        if (c == tl) return true;
        else return false;
      } else return true;
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
      if (this.user.user.userFire.joinEvent == undefined)
        this.user.user.userFire.joinEvent = [];
      this.user.user.userFire.joinEvent.push(eId);
      user().setUser(this.user.user);
      return [this.user.user, this.user.ID];
    },
    updateEvent: function (event, uID) {
      if (event.users == undefined) event.users = [];
      event.users.push(uID);
      return event;
    },
    updateUserExit: function (eId) {
      const events = this.user.jEvents;
      this.user.user.userFire.joinEvent = this.filtering(events, eId);
      user().setUser(this.user.user);
      return [this.user.user, this.user.ID];
    },
    updateEventExit: function (event, uID) {
      if (event.users == undefined) event.users = [];
      event.users = this.filtering(event.users, uID);
      return event;
    },
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
    getUserImages: function () {},
  },
  mounted() {
    this.joinCheck = this.checkEvent();
  },
};
</script>
<style scoped>
.upper-texts {
  max-width: 45%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img {
  height: 200px;
  border-radius: 10px;
  margin: auto;
  background-position: center;
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
  max-width: 100vw;
}
a {
  color: black;
  text-decoration: none;
}
a:visited {
  color: black;
}
</style>
