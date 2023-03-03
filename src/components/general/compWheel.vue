<template>
  <div style="position: absolute; display: none">
    {{ `width:${s[0]};height:${s[0]}; ${style})` }}
  </div>
  <div class="wheel text-center" :class="{ transition: transition }" :style="`width:${s[0]};height:${s[0]}; ${style})`"
    ref="wheel" @touchstart="dragStart" @touchmove="dragEvent" @touchend="dragEnd">
    <div></div>
    <div></div>
    <div>
      <div :style="styleInner">
        <slot name="c" />
      </div>
    </div>
    <div>
      <div :style="styleInner">
        <slot name="ie" />
      </div>
    </div>
    <div>
      <div :style="styleInner">
        <slot name="is" />
      </div>
    </div>
    <div>
      <div :style="styleInner">
        <slot name="iw" />
      </div>
    </div>
    <div>
      <div :style="styleInner">
        <slot name="in" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInner">
        <slot name="oe" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInner">
        <slot name="os" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInner">
        <slot name="ow" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInner">
        <slot name="on" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInnerException">
        <slot name="ose" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInnerException">
        <slot name="osw" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInnerException">
        <slot name="onw" />
      </div>
    </div>
    <div>
      <div class="bg-secondary round" :style="styleInnerException">
        <slot name="one" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSide,
  getRotate,
  getLastValues,
  getLastRotate,
} from "@/services/animations/wheel";
export default {
  props: ["s", "r", "p", "moveEndEvent", "moveEvent"],
  data() {
    return {
      rotate: 0,
      transition: true,
      lastPosition: [0, 0],
      lastSide: [false, false],
      style: "",
      styleInner: "",
      styleInnerException: "",
    };
  },
  methods: {
    dragStart: function (e) {
      this.transition = false;
      const size = [
        this.$refs.wheel.offsetWidth,
        this.$refs.wheel.offsetHeight,
        this.$refs.wheel.offsetLeft,
        this.$refs.wheel.offsetTop,
      ];
      this.lastPosition = [e.touches[0].clientX, e.touches[0].clientY];
      this.lastSide = getSide(this.lastPosition, size);
    },
    dragEvent: function (e) {
      const currentPosition = [e.touches[0].clientX, e.touches[0].clientY];
      const size = [
        this.$refs.wheel.offsetWidth,
        this.$refs.wheel.offsetHeight,
        this.$refs.wheel.offsetLeft,
        this.$refs.wheel.offsetTop,
      ];
      const gt = [currentPosition, this.lastPosition, this.lastSide];
      this.rotate += (getRotate(gt[0], gt[1], gt[2]) * 2) / 3;
      [this.lastPosition, this.lastSide] = getLastValues(currentPosition, size);
      if (this.moveEvent) this.moveEvent(Math.floor(this.rotate / this.r));
    },
    dragEnd: function () {
      this.transition = true;
      this.rotate = getLastRotate(this.rotate, this.r);
      if (this.moveEndEvent) this.moveEndEvent(Math.floor(this.rotate / this.r));
    },
  },
  watch: {
    rotate() {
      this.style = `transform: rotate(${this.rotate}deg);`;
      this.styleInner = `transform: rotate(${this.rotate * -1}deg);`;
      this.styleInnerException = `transform: rotate(${(this.rotate + 45) * -1
        }deg);`;
    },
    p() {
      this.rotate = this.p * this.r;
    },
  },
};
</script>
<style lang="scss">
.round {
  border-radius: 50%;
}

.transition {
  transition: 1s;

  >div,
  >div>div {
    transition: 1s;
  }
}

.wheel {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-content: center;
  align-items: center;

  >div {
    position: absolute;
  }

  //wheel
  &>div:nth-child(1) {
    width: 51%;
    height: 51%;
    border-radius: 50%;
    border: 2px dashed #00000050;
  }

  //wheel
  &>div:nth-child(2) {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 2px dashed #00000050;
  }

  //center
  &>div:nth-child(3) {
    border-radius: 50%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
  }

  //inner icons
  &>div:nth-child(4) {
    padding-left: 50%;
  }

  &>div:nth-child(5) {
    padding-top: 50%;
  }

  &>div:nth-child(6) {
    padding-right: 50%;
  }

  &>div:nth-child(7) {
    padding-bottom: 50%;
  }

  //outter icons
  &>div:nth-child(8),
  &>div:nth-child(12) {
    padding-left: 90%;
  }

  &>div:nth-child(9),
  &>div:nth-child(13) {
    padding-top: 90%;
  }

  &>div:nth-child(10),
  &>div:nth-child(14) {
    padding-right: 90%;
  }

  &>div:nth-child(11),
  &>div:nth-child(15) {
    padding-bottom: 90%;
  }

  //outter between icons
  &>div:nth-child(12) {
    transform: rotate(45deg);

    &>div {
      transform: rotate(-45deg);
    }
  }

  &>div:nth-child(13) {
    transform: rotate(45deg);

    &>div {
      transform: rotate(-45deg);
    }
  }

  &>div:nth-child(14) {
    transform: rotate(45deg);

    &>div {
      transform: rotate(-45deg);
    }
  }

  &>div:nth-child(15) {
    transform: rotate(45deg);

    &>div {
      transform: rotate(-45deg);
    }
  }
}
</style>
