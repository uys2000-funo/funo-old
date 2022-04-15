<template>
  <div
    @mousemove="moveEvent"
    @touchmove="moveEvent"
    @mouseup="isMove = false"
    @touchend="isMove = false"
    style="min-height: 100vh"
  >
    <div class="page">
      <router-view />
    </div>
    <div
      class="a"
      :style="position"
      @mousedown="isMove = true"
      @touchstart="isMove = true"
    >
      <q-expansion-item label="Pages">
        <q-scroll-area class="b">
          <q-btn
            style="width: 100%"
            v-for="item in routes"
            :key="item"
            :label="item.name"
            :to="item.path"
          />
        </q-scroll-area>
      </q-expansion-item>
    </div>
  </div>
</template>
<script>
export default {
  props: ["routes"],
  data() {
    return {
      isMove: false,
      position: "right: 0px; top: 0px;",
    };
  },
  methods: {
    getPosition: function (target) {
      if (target.clientX) return [target.clientX, target.clientY];
      else return [target.touches[0].clientX, target.touches[0].clientY];
    },
    moveAction: function (target) {
      const positons = this.getPosition(target);
      this.position = `left: ${positons[0]}px; top: ${positons[1]}px; transform: translate( -50%, -50% );`;
    },
    moveEvent: function (target) {
      if (this.isMove) this.moveAction(target);
    },
  },
};
</script>

<style scoped>
.a {
  position: absolute;
  width: 200px;
  background-color: wheat;
}
.b {
  width: 200px;
  height: 200px;
}
.page{
  padding: 10vh 20vw;
}
</style>
