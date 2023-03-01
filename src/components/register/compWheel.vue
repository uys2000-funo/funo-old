<template>
  <div>
    <comp-wheel :s="['60vw', '60vw']" :p="pageNumber" :r="90" :moveEndEvent="moveEndEvent">
      <template v-slot:c>
        <img :src="require('@/assets/images/logo.svg')" style="width: 100%" alt="No Profile Photo" />
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
          <icon-person class="fill-primary" />
        </div>
      </template>
      <template v-slot:ose>
        <div class="outter-dot">
          <icon-dot class="fill-primary" />
        </div>
      </template>
      <template v-slot:os>
        <div class="outter-icon">
          <icon-temp class="fill-negative" />
        </div>
      </template>
      <template v-slot:osw>
        <div class="outter-dot">
          <icon-dot class="fill-negative" />
        </div>
      </template>
      <template v-slot:ow>
        <div class="outter-icon">
          <icon-image class="fill-primary" />
        </div>
      </template>
      <template v-slot:onw>
        <div class="outter-dot">
          <icon-dot class="fill-primary" />
        </div>
      </template>
      <template v-slot:on>
        <div class="outter-icon">
          <icon-apps class="fill-negative" />
        </div>
      </template>
      <template v-slot:one>
        <div class="outter-dot">
          <icon-dot class="fill-negative" />
        </div>
      </template>
    </comp-wheel>
  </div>
</template>
<script>
import compWheel from "@/components/general/compWheel.vue";
import iconPerson from "@/icons/general/iconPerson.vue";
import iconTemp from "@/icons/register/iconTemp.vue";
import iconApps from "@/icons/register/iconApps.vue";
import iconImage from "@/icons/general/iconImage.vue";
import iconDot from "@/icons/general/iconDot.vue";
export default {
  components: { compWheel, iconPerson, iconTemp, iconApps, iconImage, iconDot },
  props: ["r", "setR", "pageNumber"],
  methods: {
    moveEndEvent: function (res) {
      if (!this.setR) return;
      const r = res % 4
      this.setR(r < 0 ? r + 4 : r);
    },
    mounted() {
      this.moveEndEvent(this.pageNumber);
    }
  }
};
</script>
<style scoped>
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
