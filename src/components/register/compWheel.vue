<template>
  <div>
    <comp-wheel :s="['60vw', '60vw']" :p="pageNumber" :r="90" :moveEndEvent="moveEndEvent">
      <template v-slot:c>
        <img :src="require('@/assets/images/Logo.svg')" style="width: 100%" alt="No Profile Photo" />
      </template>
      <template v-slot:ie>
        <icon-dot class="fill-negative" />
      </template>
      <template v-slot:is>
        <icon-dot class="fill-primary" />
      </template>
      <template v-slot:iw>
        <icon-dot class="fill-negative" />
      </template>
      <template v-slot:in>
        <icon-dot class="fill-primary" />
      </template>
      <template v-slot:oe>
        <icon-person class="fill-primary" />
      </template>
      <template v-slot:ose>
        <icon-dot class="fill-primary" />
      </template>
      <template v-slot:os>
        <icon-temp class="fill-negative" />
      </template>
      <template v-slot:osw>
        <icon-dot class="fill-negative" />
      </template>
      <template v-slot:ow>
        <icon-image class="fill-primary" />
      </template>
      <template v-slot:onw>
        <icon-dot class="fill-primary" />
      </template>
      <template v-slot:on>
        <icon-apps class="fill-negative" />
      </template>
      <template v-slot:one>
        <icon-dot class="fill-negative" />
      </template>
    </comp-wheel>
  </div>
</template>
<script>
import compWheel from "@/components/general/compWheel.vue";
import iconPerson from "@/Icons/register/iconPerson.vue"
import iconTemp from "@/Icons/register/iconTemp.vue"
import iconApps from "@/Icons/register/iconApps.vue"
import iconImage from "@/Icons/register/iconImage.vue"
import iconDot from "@/Icons/iconDot.vue"
export default {
  components: { compWheel, iconPerson, iconTemp, iconApps, iconImage, iconDot },
  props: ["r", "setR", "pageNumber"],
  methods: {
    moveEndEvent: function (res) {
      if (!this.setR) return;
      const r = res % 4
      this.setR(r < 0 ? r + 4 : r);
    },
  }
};
</script>
