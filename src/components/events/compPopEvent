<template>
  <div
    class="q-mx-sm"
    @click="$router.push(`/app/main/events/event/${event.id}`)"
  >
    <div
      style="
        width: 150px;
        height: 100px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
      "
      :style="`background-image: url('${require('@/assets/images/loading.gif')}'); ${image}`"
    ></div>
    <div class="text-center">{{ event.name }} - {{ event.usersCount }}</div>
  </div>
</template>
<script>
import { getImgStorage } from "@/services/firebase/event";
export default {
  props: ["event"],
  data() {
    return {
      imageUrl: "",
    };
  },
  computed: {
    image: function () {
      return `background-image: url("${this.imageUrl}");`;
    },
  },
  methods: {},
  mounted() {
    getImgStorage(`E/${this.event.eID}/imgs/img0`).then(
      (imageUrl) => (this.imageUrl = imageUrl)
    );
  },
};
</script>
