<template>
  <q-carousel
    animated
    v-model="slide"
    arrows
    navigation
    :infinite="cImg > 1"
    style="height: 35vh"
  >
    <q-carousel-slide
      v-for="img in cImg"
      :key="img"
      :name="img"
      :img-src="getImg"
    />
  </q-carousel>
</template>

<script>
import { getImgStorage } from "@/services/firebase/event";
export default {
  props: ["cImg", "eID"],
  data() {
    return {
      slide: 1,
      imgs: [],
    };
  },
  computed: {
    loading: function () {
      return require("@/assets/images/loading.gif");
    },
    getImg: function () {
      if (this.imgs[this.slide] == undefined) this.getImgFunc();
      return this.imgs[this.slide];
    },
  },
  methods: {
    getImgFunc: function () {
      this.imgs[this.slide] = this.loading;
      getImgStorage(`E/${this.eID}/imgs/img${this.slide - 1}`).then((res) => {
        console.log(res);
        this.imgs[this.slide] = res;
      });
      return;
    },
  },
  mounted() {
    console.log(this.cImg, this.eID);
  },
};
</script>
