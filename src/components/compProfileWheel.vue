<template>
  <div
    class="wheel wheel-45 text-center"
    :class="{ transition: transition }"
    :style="`width:${w};height:${h};transform:rotate(${rotate}deg)`"
    ref="wheel"
    @touchstart="dragStart"
    @touchmove="dragEvent"
    @touchend="dragEnd"
  >
    <div></div>
    <div></div>
    <div><div>center</div></div>
    <div><div>i-E</div></div>
    <div><div>i-S</div></div>
    <div><div>i-W</div></div>
    <div><div>i-N</div></div>
    <div><div>o-E</div></div>
    <div><div>o-S</div></div>
    <div><div>o-W</div></div>
    <div><div>o-N</div></div>
    <div><div>o-SE</div></div>
    <div><div>o-SW</div></div>
    <div><div>o-NW</div></div>
    <div><div>o-NE</div></div>
  </div>
</template>

<script>
import {
  getSide,
  getRotate,
  getLastValues,
} from "@/services/core/animations/wheel";
export default {
  props: ["w", "h"],
  data() {
    return {
      rotate: "0",
      transition: true,
      lastPosition: [0, 0],
      lastSide: [false, false],
    };
  },
  methods: {
    dragStart: function (e) {
      const size = [
        this.$refs.wheel.offsetWidth,
        this.$refs.wheel.offsetHeight,
      ];
      this.transition = false;
      this.lastPosition = [e.touches[0].clientX, e.touches[0].clientY];
      this.lastSide = getSide(this.lastPosition, size);
    },
    dragEvent: function (e) {
      const currentPosition = [e.touches[0].clientX, e.touches[0].clientY];
      const size = [
        this.$refs.wheel.offsetWidth,
        this.$refs.wheel.offsetHeight,
      ];
      const gt = [currentPosition, this.lastPosition, this.lastSide];
      this.rotate = getRotate(gt[0], gt[1], gt[2]) / 2;
      [this.lastPosition, this.lastSide] = getLastValues(currentPosition, size);
    },
    dragEnd: function (e) {
      e;
    },
  },
};
</script>
<style lang="scss">
.transition {
  transition: 1s;
}
.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transition: 1s;
  > div,
  > div > div {
    transition: 1s;
  }

  > div {
    position: absolute;
  }
  //wheel
  & > div:nth-child(1) {
    width: 50%;
    height: 50%;
    border-radius: 50%;
    border: 1px dashed;
  }
  //wheel
  & > div:nth-child(2) {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 1px dashed;
  }
  //inner icons
  & > div:nth-child(4) {
    padding-left: 50%;
  }
  & > div:nth-child(5) {
    padding-top: 50%;
  }
  & > div:nth-child(6) {
    padding-right: 50%;
  }
  & > div:nth-child(7) {
    padding-bottom: 50%;
  }
  //outter icons
  & > div:nth-child(8),
  & > div:nth-child(12) {
    padding-left: 90%;
  }
  & > div:nth-child(9),
  & > div:nth-child(13) {
    padding-top: 90%;
  }
  & > div:nth-child(10),
  & > div:nth-child(14) {
    padding-right: 90%;
  }
  & > div:nth-child(11),
  & > div:nth-child(15) {
    padding-bottom: 90%;
  }
  //outter between icons
  & > div:nth-child(12) {
    transform: rotate(45deg);
    & > div {
      transform: rotate(-45deg);
    }
  }
  & > div:nth-child(13) {
    transform: rotate(45deg);
    & > div {
      transform: rotate(-45deg);
    }
  }
  & > div:nth-child(14) {
    transform: rotate(45deg);
    & > div {
      transform: rotate(-45deg);
    }
  }
  & > div:nth-child(15) {
    transform: rotate(45deg);
    & > div {
      transform: rotate(-45deg);
    }
  }
}
.wheel-45 {
  transform: rotate(45deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-45deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-90deg);
  }
}
.wheel-90 {
  transform: rotate(90deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-90deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-135deg);
  }
}
.wheel-135 {
  transform: rotate(135deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-135deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-180deg);
  }
}
.wheel-180 {
  transform: rotate(180deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-180deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-225deg);
  }
}
.wheel-225 {
  transform: rotate(225deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-225deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-270deg);
  }
}
.wheel-270 {
  transform: rotate(270deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-270deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-315deg);
  }
}
.wheel-315 {
  transform: rotate(315deg);
  & > div:nth-child(1) > div,
  & > div:nth-child(2) > div,
  & > div:nth-child(3) > div,
  & > div:nth-child(4) > div,
  & > div:nth-child(5) > div,
  & > div:nth-child(6) > div,
  & > div:nth-child(7) > div,
  & > div:nth-child(8) > div,
  & > div:nth-child(9) > div,
  & > div:nth-child(10) > div,
  & > div:nth-child(11) > div {
    transform: rotate(-315deg);
  }
  & > div:nth-child(12) > div,
  & > div:nth-child(13) > div,
  & > div:nth-child(14) > div,
  & > div:nth-child(15) > div {
    transform: rotate(-360deg);
  }
}
</style>
