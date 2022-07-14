<template>
  <img
    class="b"
    :src="require('@/assets/images/register/outTag.svg')"
    alt="image"
  />
  <img
    v-for="p in 6"
    :key="positions[p - 1]"
    class="tag"
    :style="`left: ${positions[p - 1][0]}; top:${positions[p - 1][1]}`"
    :src="
      require(`@/assets/images/register/${
        imgs[p - 1] ? imgs[p - 1] : 'tag'
      }.svg`)
    "
    :alt="null"
  />
</template>
<script>
export default {
  props: ["imgs"],
  data() {
    return {
      imgNames: ["part", "artt", "spor", "musi", "meet", "educ"],
      positions: [],
      t1: [0, 0],
      t2: [0, 0],
      m1: [0, 0],
      m2: [0, 0],
      b1: [0, 0],
      b2: [0, 0],
    };
  },
  methods: {
    setTopPoints: function (W, H) {
      const R = H / 3;
      const t1 = [`calc(${W / 2 + R / 3}px - 3vh)`, `calc(${0}px + 6vh) `];
      const t2 = [`calc(${W / 2 - R / 3}px + 3vh)`, `calc(${0}px + 6vh) `];
      this.positions[1] = t1;
      this.positions[0] = t2;
    },
    setMidPoints: function (W, H) {
      const R = H / 3;
      const m1 = [
        `calc(${W / 2 + R / 2}px - 3vh)`,
        `calc(${R / 2}px + calc(3vh / 2))`,
      ];
      const m2 = [
        `calc(${W / 2 - R / 2}px + 3vh)`,
        `calc(${R / 2}px + calc(3vh / 2))`,
      ];
      this.positions[2] = m1;
      this.positions[5] = m2;
    },
    setBotPoints: function (W, H) {
      const R = H / 3;
      const b1 = [`calc(${W / 2 + R / 3}px - 3vh)`, `calc(${R}px - 3vh)`];
      const b2 = [`calc(${W / 2 - R / 3}px + 3vh)`, `calc(${R}px - 3vh)`];
      this.positions[3] = b1;
      this.positions[4] = b2;
    },
  },
  beforeMount() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.setTopPoints(w, h);
    this.setMidPoints(w, h);
    this.setBotPoints(w, h);
  },
};
</script>
<style scoped>
.b {
  margin-top: 3vh;
  height: calc(100% - 3vh);
  transition: 0.2s;
}
.tag {
  position: fixed;
  height: 6vh;
  transform: translate(-50%, -50%);
}
</style>
