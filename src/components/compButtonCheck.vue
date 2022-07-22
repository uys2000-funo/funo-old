<template>
  <q-btn
    flat
    class="fit"
    dense
    rounded
    no-caps
    :color="clr"
    @click="setChecked"
  >
    <div class="a" style="color: gray">
      <q-icon>
        <img :src="require(`@/assets/images/icons/${btn}.svg`)" alt="" />
      </q-icon>
      <span v-if="!event.tags[btn]" class="q-ml-sm text-gray">{{
        btnName
      }}</span>
      <span v-if="event.tags[btn]" class="q-ml-sm text-black">{{
        btnName
      }}</span>
    </div>
  </q-btn>
</template>

<script>
export default {
  inject: ["updateEventInner"],
  props: ["btn", "btnName", "clr", "event"],
  methods: {
    setChecked: function () {
      this.updateEventInner("tags", this.btn, !this.event.tags[this.btn]);
    },
  },
};
</script>

<style scoped>
.a {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  min-width: fit-content;
  min-height: fit-content;
  width: 100%;
  height: 100%;
}
span {
  font-size: 4.5vw;
}
</style>
