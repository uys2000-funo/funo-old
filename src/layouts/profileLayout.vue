<template>
  <div class="row o flex column">
    <div
      class="col-4 flex justify-center"
      style="overflow: hidden; max-width: 100vw"
    >
      <div style="margin-top: -33%">
        <comp-profile-wheel w="90vw" h="90vw">
          <template v-slot:c> profile image </template>
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
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:ose>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:os>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:osw>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:ow>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:onw>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:on>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
          <template v-slot:one>
            <img :src="require('@/assets/images/dot.svg')" />
          </template>
        </comp-profile-wheel>
      </div>
    </div>
    <div class="col-8">asd</div>
  </div>
</template>
<script>
import compProfileWheel from "@/components/compProfileWheel.vue";
export default {
  components: {
    compProfileWheel,
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>
