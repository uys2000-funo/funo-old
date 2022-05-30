<template>
  <div class="q-mb-md a">
    <div class="row wrap justify-between items-start content-start">
      <span>{{ event.ownersNames[0] }}</span>
      <span>{{ event.name }}</span>
    </div>
    <div
      class="img"
      :style="` background-image: url('${require('@/assets/images/loading.gif')}'); ${bgImg}`"
    ></div>
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4">
        {{ event.startDate.time }}-{{ event.endDate.time }}
      </span>
      <span class="col-4 text-center q-my-sm">
        {{ event.price == 0 ? "ücrestis" : event.price }}
      </span>
      <span class="col-4 text-right">Katılımcılar</span>
    </div>
    <div class="row wrap justify-between items-center content-center">
      <span class="col-4">{{ event.app }}</span>
      <q-btn
        class="col-4 text-center bg-primary"
        label="katıl"
        dense
        @click="joinEvent(event)"
      />
      <span class="col-4 text-right">
        <router-link :to="{ path: `/app/main/${event.id}` }">
          Dahası
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { getImgStorage, joinEvent } from "@/services/firebase/main";
export default {
  props: ["event"],
  inject: ["getUser", "setUser"],
  data() {
    return {
      imgPath: "",
    };
  },
  computed: {
    bgImg: function () {
      this.getImg();
      return this.imgPath;
    },
  },
  methods: {
    getImg: function () {
      getImgStorage(`E/${this.event.id}/imgs/img0`).then((res) => {
        console.log(res);
        this.imgPath = `background-image: url("${res}"); `;
      });
    },
    updateUser: function (eId) {
      const user = this.getUser();
      if (user.userFire.joinEvent == undefined) user.userFire.joinEvent = [];
      user.userFire.joinEvent.push(eId);
      this.setUser(user);
      return [user, user.userAuth.user.uid];
    },
    updateEvent: function (event, uID) {
      if (event.users == undefined) event.users= [];
      event.users.push(uID);
      return event;
    },
    joinEvent: function (event) {
      const [user, uID] = this.updateUser(event.id);
      event = this.updateEvent(event, uID);
      joinEvent(uID, event.id, user.userFire, event);
    },
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
