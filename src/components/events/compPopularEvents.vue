<template>
  <div class="text-h5">Popular Etkinlikler</div>
  <div>Şimdilik En çok katılımcısı olan Etkinlikler</div>
  <q-scroll-area style="width: 100vw; height: 125px">
    <div class="row no-wrap">
      <template v-for="eID in events.eventPopularList" :key="eID">
        <comp-pop-event v-if="eventDict[eID]" :event="eventDict[eID]" />
      </template>
    </div>
  </q-scroll-area>
</template>
<script>
import { events } from "@/store/events";
import compPopEvent from "./compPopEvent.vue";
export default {
  components: { compPopEvent },
  data() {
    return {
      events: events(),
      eventDict: events().eventDict,
      eventPopularList: events().eventPopularList,
    };
  },
};
</script>
