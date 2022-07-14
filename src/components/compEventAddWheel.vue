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
    };
  },
  methods: {
    pageUpdate: function (K) {
      const k = K % 4;
      if (k == 0)
        if (this.page < -1) this.setPage(-4);
        else if (this.page > 1) this.setPage(4);
        else {
          this.setPage(0);
          this.$router.push("/register");
        }
      else if (k == 1) this.page < 0 ? this.setPage(-1) : this.setPage(1);
      else if (k == 2) this.page < 0 ? this.setPage(-2) : this.setPage(2);
      else this.page < 0 ? this.setPage(-3) : this.setPage(3);
    },
    updateLast: function (X, Y) {
      if (this.page != 0) {
        this.lastPosition = [X, Y];
        this.lastSides = this.getSide(X, Y);
      } else this.rotation = 0;
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
      this.rotation += (x - y) / 2;
    },
    rotateTopRigh: function (X, Y) {
      let x = X - this.lastPosition[0];
      let y = this.lastPosition[1] - Y;
      this.rotation += (x - y) / 2;
    },
    rotateBotLeft: function (X, Y) {
      let x = this.lastPosition[0] - X;
      let y = Y - this.lastPosition[1];
      this.rotation += (x - y) / 2;
    },
    rotateBotRigh: function (X, Y) {
      let x = this.lastPosition[0] - X;
      let y = this.lastPosition[1] - Y;
      this.rotation += (x - y) / 2;
    },
    getSide: function (X, Y) {
      const cWidth = window.innerWidth / 2;
      const cHeigh = window.innerHeight / 6;
      let [x, y] = [false, false];
      if (X < cWidth) x = true;
      if (Y < cHeigh) y = true;
      return [x, y];
    },
    calculateRotate: function (X, Y) {
      if (this.lastSides[0] && this.lastSides[1]) this.rotateTopLeft(X, Y);
      else if (!this.lastSides[0] && this.lastSides[1])
        this.rotateTopRigh(X, Y);
      else if (this.lastSides[0] && !this.lastSides[1])
        this.rotateBotLeft(X, Y);
      else this.rotateBotRigh(X, Y);
      this.updateLast(X, Y);
    },
    dragStart: function (event) {
      this.trans = "";
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
  transition: 0.2s;
}
</style>
