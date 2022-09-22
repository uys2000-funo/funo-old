<template>
  <popup-comp fullscreen>
    <back-button />
    <q-scroll-area class="fit">
      <router-view :event="event" />
    </q-scroll-area>
  </popup-comp>
</template>
<script>
import { getEvent } from "@/services/firebase/event";
import popupComp from "@/components/general/popupComp.vue";
import backButton from "@/components/general/backButton.vue";
export default {
  components: {
    popupComp,
    backButton,
  },
  data() {
    return {
      event: {},
    };
  },
  methods: {
    getEvent: function () {
      getEvent(this.$route.params.id).then((res) => {
        this.event = res.data();
        console.log(this.event);
      });
    },
  },
  mounted() {
    this.getEvent();
  },
};
</script>
