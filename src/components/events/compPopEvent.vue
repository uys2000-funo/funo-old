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
      :style="`background-image: url('${require('@/assets/images/loading.gif')}'); ${bgImg}`"
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
        this.imgPath = `background-image: url("${res}"); `;
      });
    },
  },
};
</script>
