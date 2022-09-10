<template>
  <div class="row o flex column">
    <div
      class="col-4 flex justify-center"
      style="overflow: hidden; max-width: 100vw"
    >
      <div style="margin-top: -33%">
        <comp-wheel
          :s="['90vw', '90vw']"
          :r="45"
          :se="[1, 0.33]"
          :moveEvent="moveEvent"
        >
          <template v-slot:c> {{ r }} </template>
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
    </div>
    <div class="col-8">asd</div>
  </div>
</template>
<script>
import compWheel from "@/components/compWheel.vue";
export default {
  components: {
    compWheel,
  },
  data() {
    return {
      people: require("@/assets/images/discover/people.svg"),
      search: require("@/assets/images/discover/search.svg"),
      party: require("@/assets/images/discover/party.svg"),
      user: require("@/assets/images/discover/user.svg"),
      img: require("@/assets/images/discover/img.svg"),
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
      r: 0,
    };
  },
  methods: {
    setupEvent: function () {
      this.p.ne = this.img;
      this.p.e = this.people;
      this.p.se = this.search;
      this.p.s = this.party;
      this.p.sw = this.user;
      this.p.w = this.img;
      this.p.nw = this.people;
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
      console.log(i);
      this.r = res;
    },
  },
  mounted() {
    this.setupEvent(0);
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>
