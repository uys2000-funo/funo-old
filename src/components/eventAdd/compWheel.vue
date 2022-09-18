<template>
  <comp-wheel :s="['50vw', '50vw']" :r="90" :se="[2, 1]">
    <template v-slot:c>
      <img
        :src="require('@/assets/images/logo.svg')"
        style="width: 100%"
        alt=""
      />
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
      <img :src="require('@/assets/images/eventAdd/info.svg')" />
    </template>
    <template v-slot:os>
      <img :src="require('@/assets/images/eventAdd/time.svg')" />
    </template>
    <template v-slot:ow>
      <img :src="require('@/assets/images/eventAdd/location.svg')" />
    </template>
    <template v-slot:on>
      <img :src="require('@/assets/images/eventAdd/img.svg')" />
    </template>
  </comp-wheel>
</template>
<script>
import compWheel from "@/components/general/compWheel.vue";
export default {
  components: { compWheel },
  props: ["r", "setR"],
};
</script>
