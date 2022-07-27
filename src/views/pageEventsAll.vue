<template>
  <q-infinite-scroll @load="onLoad" :offset="0" v-if="eventsShow.length != 0">
    <div v-for="event in eventsShow" :key="event">
      <com-event :event="event" v-if="checkTags(event.tags)" />
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
  <router-view />
</template>

<script>
import comEvent from "@/components/compEvent.vue";
import { getAllEvetnts } from "@/services/firebase/main";
export default {
  components: {
    comEvent,
  },
  props: ["tags"],
  data() {
    return {
      shown: { f: 0, l: 2 },
      eventsShow: [],
      events: [],
    };
  },
  methods: {
    onLoad: function (index, done) {
      index;
      this.eventsShow = this.eventsShow.concat(
        this.events.slice(this.shown.f, this.shown.l)
      );
      this.shown.f += 2;
      this.shown.l += 2;
      done();
    },
    checkTags: function (tags) {
      if (this.tags.length != 0) {
        if (this.tags.some((val) => tags[val])) return true;
        else return false;
      } else return true;
    },
  },
  mounted() {
    getAllEvetnts().then((res) => {
      this.events = res.docs.map((item) => {
        let i = item.data();
        i["id"] = item.id;
        return i;
      });
      this.onLoad(0, () => "");
    });
  },
};
</script>
