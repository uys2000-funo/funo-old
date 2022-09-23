<template>
  <comp-wheel
    :s="['60vw', '60vw']"
    :r="90"
    :p="eventAdd.pageBtn"
    :moveEndEvent="setPage"
  >
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
      <img :src="require('@/assets/images/dotRed.svg')" />
    </template>
    <template v-slot:iw>
      <img :src="require('@/assets/images/dot.svg')" />
    </template>
    <template v-slot:in>
      <img :src="require('@/assets/images/dotRed.svg')" />
    </template>
    <template v-slot:ose>
      <img class="s" :src="require('@/assets/images/dot.svg')" />
    </template>
    <template v-slot:osw>
      <img class="s" :src="require('@/assets/images/dotRed.svg')" />
    </template>
    <template v-slot:one>
      <img class="s" :src="require('@/assets/images/dotRed.svg')" />
    </template>
    <template v-slot:onw>
      <img class="s" :src="require('@/assets/images/dot.svg')" />
    </template>
    <template v-slot:oe>
      <img class="i" :src="require('@/assets/images/eventAdd/time.svg')" />
    </template>
    <template v-slot:os>
      <img class="i" :src="require('@/assets/images/eventAdd/info.svg')" />
    </template>
    <template v-slot:ow>
      <img class="i" :src="require('@/assets/images/eventAdd/img.svg')" />
    </template>
    <template v-slot:on>
      <img class="i" :src="require('@/assets/images/eventAdd/location.svg')" />
    </template>
  </comp-wheel>
</template>
<script>
import compWheel from "@/components/general/compWheel.vue";
import { eventAdd } from "@/store/eventAdd";
export default {
  components: { compWheel },
  data() {
    return {
      eventAdd: eventAdd(),
    };
  },
  methods: {
    setPage: function (value) {
      this.eventAdd.setPage(value);
      this.eventAdd.pageBtn = value;
    },
  },
};
</script>
<style scoped>
.i {
  width: 9vw;
}
.s {
  width: 3vw;
}
</style>
