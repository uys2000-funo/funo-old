<template>
  <div style="margin-top: -30%;">
    <comp-wheel :s="['80vw', '80vw']" :p="pageNumber" :r="45" :moveEndEvent="moveEndEvent" :moveEvent="moveEvent">
      <template v-slot:c>
        <div class="center">
          <img :src="photoURL" style="width: 100%" alt="No Profile Photo" />
        </div>
      </template>
      <template v-slot:ie>
        <div class="inner-dot">
          <icon-dot class="fill-negative" />
        </div>
      </template>
      <template v-slot:is>
        <div class="inner-dot">
          <icon-dot class="fill-primary" />
        </div>
      </template>
      <template v-slot:iw>
        <div class="inner-dot">
          <icon-dot class="fill-negative" />
        </div>
      </template>
      <template v-slot:in>
        <div class="inner-dot">
          <icon-dot class="fill-primary" />
        </div>
      </template>
      <template v-slot:oe>
        <div class="outter-icon">
          <Component :is="east" class="fill-primary" />
        </div>
      </template>
      <template v-slot:ose>
        <div class="outter-icon">
          <Component :is="southEast" class="fill-accent" />
        </div>
      </template>
      <template v-slot:os>
        <div class="outter-icon">
          <Component :is="south" class="fill-negative" />
        </div>
      </template>
      <template v-slot:osw>
        <div class="outter-icon">
          <Component :is="southWest" class="fill-accent" />
        </div>
      </template>
      <template v-slot:ow>
        <div class="outter-icon">
          <Component :is="west" class="fill-primary" />
        </div>
      </template>
      <template v-slot:onw>
        <div class="outter-icon">
          <Component :is="northWest" class="fill-accent" />
        </div>
      </template>
      <template v-slot:on>
        <div class="outter-icon">
          <Component :is="north" class="fill-negative" />
        </div>
      </template>
      <template v-slot:one>
        <div class="outter-icon">
          <Component :is="northEast" class="fill-accent" />
        </div>
      </template>
      {{ pageNumber }}
    </comp-wheel>
  </div>
</template>
<script>
import compWheel from "@/components/general/compWheel.vue";
import iconDot from "@/icons/general/iconDot.vue";

import iconNull from "@/components/compNull.vue";
import iconAccount from "@/icons/user/iconAccount.vue";
import iconSettings from "@/icons/user/iconSettings.vue";
import iconEdit from "@/icons/user/iconEdit.vue";
import iconEvent from "@/icons/user/iconEvent.vue";
import iconMail from "@/icons/user/iconMail.vue";
import iconRun from "@/icons/user/iconRun.vue";
import iconTick from "@/icons/user/iconTick.vue";

export default {
  components: {
    compWheel, iconDot, iconNull,
    iconSettings, iconAccount, iconEdit, iconEvent, iconMail, iconRun, iconTick
  },
  props: ["r", "setR", "pageNumber", "photoURL", "type"],
  data() {
    return {
      components: [
        "iconTick",
        "iconRun",
        "iconEvent",
        "iconEdit",
        "iconSettings",
      ],
      west: "iconNull",
      southWest: "iconNull",
      south: "iconNull",
      southEast: "iconNull",
      east: "iconNull",
      northEast: "iconNull",
      north: "iconNull",
      northWest: "iconNull",
      res: -10
    }
  },
  methods: {
    updateIcons(res) {
      let getPosition;
      if (this.res == res) return;
      else if (res > 0)
        getPosition = (k, l, r) => {
          const result = (l + (Math.floor((r + k) / 8) * 3)) % 5
          return result < 0 ? (result % 5) + 5 : result
        }
      else getPosition = (k, l, r) => {
        const result = (l - (Math.floor(((r * -1) + 7 - k) / 8) * 3)) % 5
        return result < 0 ? (result % 5) + 5 : result
      }
      const items = [
        getPosition(7, 0, res),
        getPosition(6, 1, res),
        getPosition(5, 2, res),
        getPosition(4, 3, res),
        getPosition(3, 4, res),
        getPosition(2, 0, res),
        getPosition(1, 1, res),
        getPosition(0, 2, res),
      ]
      this.west = this.components[items[0]];
      this.southWest = this.components[items[1]];
      this.south = this.components[items[2]];
      this.southEast = this.components[items[3]];
      this.east = this.components[items[4]];
      this.northEast = this.components[items[5]];
      this.north = this.components[items[6]];
      this.northWest = this.components[items[7]];
    },
    moveEvent(res) {
      this.updateIcons(res)
    },
    moveEndEvent: function (res) {
      if (!this.setR) return;
      this.updateIcons(res)
      this.setR(res);
    }
  },
  mounted() {
    if (this.type) {
      this.components[3] = "iconMail"
      this.components[4] = "iconAccount"
    } else {
      this.components[3] = "iconEdit"
      this.components[4] = "iconSettings"
    }
    this.updateIcons(0)
    this.moveEndEvent(this.pageNumber);
  }
};
</script>
<style scoped>
.center {
  display: flex;
  width: 20vw;
  height: 20vw;
}

.inner-dot {
  display: flex;
  width: 2vw;
  height: 2vw;
}

.outter-dot {
  display: flex;
  width: 5vw;
  height: 5vw;
}

.outter-icon {
  display: flex;
  width: 10vw;
  height: 10vw;
}
</style>
