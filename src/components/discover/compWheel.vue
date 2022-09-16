<template>
  <div style="margin-top: -30%">
    <comp-wheel
      :s="['80vw', '80vw']"
      :r="45"
      :se="[1, 0.3]"
      :moveEvent="moveEvent"
    >
      <template v-slot:c>
        <img :src="img" style="width: 100%" alt="No Profile Photo" />
      </template>
      <template v-slot:ie>
        <img :src="require('@/assets/images/dot.svg')" />
      </template>
      <template v-slot:is>
        <img :src="require('@/assets/images/dot.svg')" />
      </template>
      <template v-slot:iw>
        <img :src="require('@/assets/images/dot.svg')" />
      </template>
      <template v-slot:in>
        <img :src="require('@/assets/images/dot.svg')" />
      </template>
      <template v-slot:oe>
        <img :src="p.e" />
      </template>
      <template v-slot:ose>
        <img :src="p.se" />
      </template>
      <template v-slot:os>
        <img :src="p.s" />
      </template>
      <template v-slot:osw>
        <img :src="p.sw" />
      </template>
      <template v-slot:ow>
        <img :src="p.w" />
      </template>
      <template v-slot:onw>
        <img :src="p.nw" />
      </template>
      <template v-slot:on>
        <img :src="p.n" />
      </template>
      <template v-slot:one>
        <img :src="p.ne" />
      </template>
    </comp-wheel>
  </div>
</template>
<script>
import { getImg, getImgStorage } from "@/services/firebase/main";
import compWheel from "@/components/compWheel.vue";
import { getLocalValue, setLocalValue } from "@/services/core/local";
import { user } from "@/store/user";
getImgStorage;
export default {
  components: { compWheel },
  props: ["r", "setR"],
  data() {
    return {
      u: user(),
      img: "",
      usersFY: require("@/assets/images/discover/people.svg"),//usersFY
      eventsFY: require("@/assets/images/discover/party.svg"),//eventsFY
      search: require("@/assets/images/discover/search.svg"),//search
      followed: require("@/assets/images/discover/user.svg"), //followed
      atmospher: require("@/assets/images/discover/img.svg"), //atmospher
      p: {
        e: "",
        se: "",
        s: "",
        sw: "",
        w: "",
        nw: "",
        n: "",
        ne: "",
      },
    };
  },
  methods: {
    setupEvent: function () {
      this.p.ne = this.atmospher;
      this.p.e = this.usersFY;
      this.p.se = this.eventsFY;
      this.p.s = this.search;
      this.p.sw = this.followed;
      this.p.w = this.atmospher;
      this.p.nw = this.usersFY;
    },
    moveEvent: function (res) {
      let i = res % 8;
      if (i < 0) i += 8;
      if (this.r != res && this.r < res)
        if (i == 0) this.p.ne = this.p.w;
        else if (i == 1) this.p.n = this.p.sw;
        else if (i == 2) this.p.nw = this.p.s;
        else if (i == 3) this.p.w = this.p.se;
        else if (i == 4) this.p.sw = this.p.e;
        else if (i == 5) this.p.s = this.p.ne;
        else if (i == 6) this.p.se = this.p.n;
        else this.p.e = this.p.nw;
      else {
        if (i == 7) this.p.nw = this.p.e;
        else if (i == 6) this.p.n = this.p.se;
        else if (i == 5) this.p.ne = this.p.s;
        else if (i == 4) this.p.e = this.p.sw;
        else if (i == 3) this.p.se = this.p.w;
        else if (i == 2) this.p.s = this.p.nw;
        else if (i == 1) this.p.sw = this.p.n;
        else this.p.w = this.p.ne;
      }
      if (this.setR) this.setR(res);
    },
  },
  mounted() {
    this.img = getLocalValue("uImg");
    getImg("U/" + this.u.ID + "/imgs/uImg").then((res) => {
      this.img = res;
      setLocalValue("uImg", res);
    });
    this.setupEvent(0);
  },
};
</script>
