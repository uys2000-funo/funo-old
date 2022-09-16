<template>
  <img
    :src="require('@/assets/images/register.svg')"
    alt="image"
    @touchmove="dragEvent"
    @touchstart="dragStart"
    @touchend="toLastPosition"
    :style="`transform: rotate(${rotation}deg) ${trans}`"
  />
</template>
<script>
export default {
  props: ["page"],
  inject: ["setPage"],
  data() {
    return {
      trans: "",
      rotation: 0,
      direction: false,
      lastSides: [false, false],
      lastPosition: [0, 0],
      sideStartPosition: [0, 0],
      k: 2,
      center: [0, 0],
    };
  },
  methods: {
    pageUpdate: function (K) {
      const k = K % 4;
      if (k == 0) this.setPage(0);
      else if (k == 1) this.page < 0 ? this.setPage(-1) : this.setPage(1);
      else if (k == 2) this.page < 0 ? this.setPage(-2) : this.setPage(2);
      else this.page < 0 ? this.setPage(-3) : this.setPage(3);
    },
    updateLast: function (X, Y) {
      this.lastPosition = [X, Y];
      this.lastSides = this.getSide(X, Y);
    },
    toLastPosition: function () {
      this.trans = "; transition: 1s";
      const r = this.rotation % 90;
      const k = Math.floor(this.rotation / 90);
      if (this.rotation < 0)
        if (r < 45) this.rotation = (k + 1) * 90;
        else this.rotation = k * 90;
      else {
        if (r < 45) this.rotation = k * 90;
        else this.rotation = (k + 1) * 90;
      }
      this.pageUpdate(Math.floor(this.rotation / 90));
    },
    rotateTopLeft: function (X, Y) {
      let x = X - this.lastPosition[0];
      let y = Y - this.lastPosition[1];
      this.rotation += (x - y) / this.k;
    },
    rotateTopRigh: function (X, Y) {
      let x = X - this.lastPosition[0];
      let y = this.lastPosition[1] - Y;
      this.rotation += (x - y) / this.k;
    },
    rotateBotLeft: function (X, Y) {
      let x = this.lastPosition[0] - X;
      let y = Y - this.lastPosition[1];
      this.rotation += (x - y) / this.k;
    },
    rotateBotRigh: function (X, Y) {
      let x = this.lastPosition[0] - X;
      let y = this.lastPosition[1] - Y;
      this.rotation += (x - y) / this.k;
    },
    getSide: function (X, Y) {
      let [x, y] = [false, false];
      if (X < this.center[0]) x = true;
      if (Y < this.center[1]) y = true;
      return [x, y];
    },
    calculateRotate: function (X, Y, cWidth, cHeigh) {
      if (this.lastSides[0] && this.lastSides[1]) this.rotateTopLeft(X, Y);
      else if (!this.lastSides[0] && this.lastSides[1])
        this.rotateTopRigh(X, Y);
      else if (this.lastSides[0] && !this.lastSides[1])
        this.rotateBotLeft(X, Y);
      else this.rotateBotRigh(X, Y);
      this.updateLast(X, Y, cWidth, cHeigh);
    },
    dragStart: function (event) {
      this.trans = "";
      this.center[0] = event.target.width / 2 + event.target.x;
      this.center[1] = event.target.height / 2 + event.target.y;
      this.lastPosition = [event.touches[0].clientX, event.touches[0].clientY];
      this.lastSides = this.getSide(this.lastPosition[0], this.lastPosition[1]);
    },
    dragEvent: function (event) {
      this.calculateRotate(event.touches[0].clientX, event.touches[0].clientY);
    },
  },
  mounted() {
    this.trans = "; transition: 1s";
    setTimeout(() => {
      const k = Math.abs(this.page);
      if (this.rotation < 0) this.rotation = k * 90;
      else this.rotation = k * 90;
      this.pageUpdate(k);
    }, 10);
  },
  watch: {
    page() {
      this.trans = "; transition: 1s";
      const k = Math.abs(this.page);
      if (this.rotation < 0) this.rotation = k * 90;
      else this.rotation = k * 90;
      this.pageUpdate(k);
    },
  },
};
</script>
<style scoped>
img {
  height: 100%;
}
</style>
